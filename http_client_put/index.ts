import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import * as ClientService from "../services/client.service";

export default withDatabaseConnection(async function (context, req) {
  await ClientService.updateClient(context, req);
});
