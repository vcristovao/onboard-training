import { Context, HttpRequest } from "@azure/functions";

export type AzureFunctionHttpRequest = (
  context: Context,
  req: HttpRequest,
) => Promise<void>;
