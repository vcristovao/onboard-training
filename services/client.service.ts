import { HttpStatusCode } from "azure-functions-ts-essentials";
import { responseFactory } from "../core/factories/response.factory";
import assertionFailureGuard from "../core/guards/assertion-failure.guard";
import assert from "../core/factories/assert-instruction.factory";
import getInteger from "../core/util/get-integer";
import Client from "../core/entities/client.entity";
import { AzureFunctionHttpRequest } from "../core";
import queryFailedGuard from "../core/guards/query-failed.guard";

export const list = queryFailedGuard(
  assertionFailureGuard<AzureFunctionHttpRequest>(async (context) => {
    context.res = {
      status: 200,
      body: await Client.find(),
    };
  }),
);

export const createClient = queryFailedGuard<AzureFunctionHttpRequest>(
  async function (context, req) {
    const { name } = req.body;
    if (typeof name !== "string") {
      context.res = responseFactory(null, 400 /* Bad Request */);
      return;
    }
    const result = await Client.insert({
      name,
      is_enabled: true,
    });
    if (result.identifiers.length === 0) {
      context.res = responseFactory(null, 500 /* Internal Server Error */);
      return;
    }
    context.res = responseFactory(result.identifiers[0], 201 /* Created */);
  },
);

export const updateClient = queryFailedGuard(
  assertionFailureGuard<AzureFunctionHttpRequest>(
    async function (context, req) {
      const changes = req.body;
      const id = getInteger(req.params["id"]);
      assert(id !== null, "ID parameter must be a valid integer");
      if (!(await Client.findOne(id))) {
        context.res = responseFactory(
          {
            error: "Client not found",
          },
          HttpStatusCode.NotFound,
        );
        return;
      }
      const result = await Client.update(id, changes);
      context.res = responseFactory(
        {
          updated: result.affected,
        },
        HttpStatusCode.OK,
      );
    },
  ),
);

export const deleteClient = queryFailedGuard(
  assertionFailureGuard<AzureFunctionHttpRequest>(async (context, req) => {
    const id = getInteger(req.params["id"]);
    assert(id !== null, "ID parameter must be a valid integer");
    if (!(await Client.findOne(id))) {
      context.res = responseFactory(
        {
          error: "Client not found",
        },
        HttpStatusCode.NotFound,
      );
      return;
    }
    const result = await Client.delete(id);
    context.res = responseFactory(
      {
        updated: result.affected,
      },
      HttpStatusCode.OK,
    );
  }),
);
