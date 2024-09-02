import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import { AzureFunctionHttpRequest } from "../core";
import { responseFactory } from "../core/factories/response.factory";
import Clients from "../core/entities/client.entity";
import queryFailedGuard from "../core/guards/query-failed.guard";

export const createClient = withDatabaseConnection(
  queryFailedGuard<AzureFunctionHttpRequest>(async function (context, req) {
    const { name } = req.body;
    if (typeof name !== "string") {
      context.res = responseFactory(null, 400 /* Bad Request */);
      return;
    }
    const result = await Clients.insert({
      name,
      is_enabled: true,
    });
    if (result.identifiers.length === 0) {
      context.res = responseFactory(null, 500 /* Internal Server Error */);
      return;
    }
    context.res = responseFactory(result.identifiers[0], 201 /* Created */);
  }),
);
