import { AzureFunctionHttpRequest } from "../core";
import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import Clients from "../entities/client/model";

export const readClients = withDatabaseConnection<AzureFunctionHttpRequest>(
  async (context, req): Promise<void> => {
    context.res = {
      status: 200,
      body: await Clients.find(),
    };
    req;
  },
);
