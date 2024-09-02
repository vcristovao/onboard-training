import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import { AzureFunctionHttpRequest } from "../core";
import { responseFactory } from "../core/factories/response.factory";
import Clients from "../core/entities/client.entity";
import queryFailedGuard from "../core/guards/query-failed.guard";
import assertionFailureGuard from "../core/guards/assertion-failure.guard";
import assert from "../core/factories/assert-instruction.factory";
import { HttpStatusCode } from "azure-functions-ts-essentials";
import getInteger from "../core/util/get-integer";

export const updateClient = assertionFailureGuard(
  withDatabaseConnection(
    queryFailedGuard<AzureFunctionHttpRequest>(async function (context, req) {
      const changes = req.body;
      const id = getInteger(req.params["id"]);
      assert(id !== null, "ID parameter must be a valid integer");
      if (!(await Clients.findOne(id))) {
        context.res = responseFactory(
          {
            error: "Client not found",
          },
          HttpStatusCode.NotFound,
        );
        return;
      }
      const result = await Clients.update(id, changes);
      context.res = responseFactory(
        {
          updated: result.affected,
        },
        HttpStatusCode.OK,
      );
    }),
  ),
);
