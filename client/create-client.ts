import withDatabaseConnection from "../core/functions/withDatabaseConnection";
import { AzureFunctionHttpRequest } from "../core";

export const createClient = withDatabaseConnection<AzureFunctionHttpRequest>(
  async function (context, req): Promise<void> {
    const {} = req.body;
    context.res = {
      status: 401,
      body: "Not ready yet",
    };
  },
);
