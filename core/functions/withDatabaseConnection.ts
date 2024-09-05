import { AzureFunction } from "@azure/functions";
import DatabaseConnection from "../../infrastructure/database_connection";
import errorBoundaryGuard from "../guards/error-boundary.guard";

export default function withDatabaseConnection<
  T extends AzureFunction = AzureFunction,
>(fn: T): AzureFunction {
  return errorBoundaryGuard(async function (context, ...args): Promise<void> {
    await DatabaseConnection.create();
    await fn(context, ...args);
  }, "Database Connection Error");
}
