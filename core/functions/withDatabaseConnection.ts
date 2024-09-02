import { AzureFunction } from "@azure/functions";
import DatabaseConnection from "../../infrastructure/database_connection";

export default function withDatabaseConnection<
  T extends AzureFunction = AzureFunction,
>(fn: T): AzureFunction {
  return async function (context, ...args): Promise<void> {
    await DatabaseConnection.create();
    await fn(context, ...args);
  };
}
