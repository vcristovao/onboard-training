import { AzureFunctionHttpRequest } from "../core";
import Clients from "../core/entities/client.entity";
import withDatabaseConnection from "../core/functions/withDatabaseConnection";

export const readClients = withDatabaseConnection<AzureFunctionHttpRequest>(
  async (context): Promise<void> => {
    context.res = {
      status: 200,
      body: await Clients.find(),
    };
  },
);
