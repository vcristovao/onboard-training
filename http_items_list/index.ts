import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import assertionFailureGuard from "../core/guards/assertion-failure.guard";
import * as ItemService from "../services/item.service";

export default assertionFailureGuard(
  withDatabaseConnection(async function (context, req) {
    await ItemService.list(context, req);
  }),
);
