import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import assertionFailureGuard from "../core/guards/assertion-failure.guard";
import * as ClientService from "../services/client.service";

export default assertionFailureGuard(
  withDatabaseConnection(async function (context, req) {
    await ClientService.list(context, req);
  }),
);
