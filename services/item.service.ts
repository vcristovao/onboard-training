import { HttpStatusCode } from "azure-functions-ts-essentials";
import { responseFactory } from "../core/factories/response.factory";
import assertionFailureGuard from "../core/guards/assertion-failure.guard";
import assert from "../core/factories/assert-instruction.factory";
import getInteger from "../core/util/get-integer";
import Item from "../core/entities/item.entity";
import { AzureFunctionHttpRequest } from "../core";
import queryFailedGuard from "../core/guards/query-failed.guard";

export const list = queryFailedGuard(
  assertionFailureGuard<AzureFunctionHttpRequest>(async (context) => {
    context.res = {
      status: 200,
      body: await Item.find({
        relations: ["client"],
      }),
    };
  }),
);

export const createItem = assertionFailureGuard(
  queryFailedGuard<AzureFunctionHttpRequest>(async function (context, req) {
    const { name } = req.body;
    const client_id = getInteger(req.body["client_id"]);
    if (typeof name !== "string") {
      context.res = responseFactory(null, 400 /* Bad Request */);
      return;
    }
    assert(client_id !== null, "client_id must be a valid integer");
    const result = await Item.insert({
      name,
      client_id,
    });
    if (result.identifiers.length === 0) {
      context.res = responseFactory(null, 500 /* Internal Server Error */);
      return;
    }
    context.res = responseFactory(result.identifiers[0], 201 /* Created */);
  }),
);

export const updateItem = queryFailedGuard(
  assertionFailureGuard<AzureFunctionHttpRequest>(
    async function (context, req) {
      const changes = req.body;
      const id = getInteger(req.params["id"]);
      assert(id !== null, "ID parameter must be a valid integer");
      if (!(await Item.findOne(id))) {
        context.res = responseFactory(
          {
            error: "Item not found",
          },
          HttpStatusCode.NotFound,
        );
        return;
      }
      const result = await Item.update(id, changes);
      context.res = responseFactory(
        {
          updated: result.affected,
        },
        HttpStatusCode.OK,
      );
    },
  ),
);

export const deleteItem = queryFailedGuard(
  assertionFailureGuard<AzureFunctionHttpRequest>(async (context, req) => {
    const id = getInteger(req.params["id"]);
    assert(id !== null, "ID parameter must be a valid integer");
    if (!(await Item.findOne(id))) {
      context.res = responseFactory(
        {
          error: "Item not found",
        },
        HttpStatusCode.NotFound,
      );
      return;
    }
    const result = await Item.delete(id);
    context.res = responseFactory(
      {
        updated: result.affected,
      },
      HttpStatusCode.OK,
    );
  }),
);
