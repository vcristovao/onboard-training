import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import * as ItemService from "../services/item.service";

export default withDatabaseConnection(async function (context, req) {
  await ItemService.deleteItem(context, req);
});
