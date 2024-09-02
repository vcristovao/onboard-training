import { HttpStatusCode } from "azure-functions-ts-essentials";
import { FunctionResponse } from "../models/function-response";

export function responseFactory<T extends unknown>(
  body: T | null = null,
  httpCode = 200,
): FunctionResponse {
  return {
    statusCode:
      httpCode === HttpStatusCode.OK && (!body || Object.keys(body).length == 0)
        ? HttpStatusCode.NoContent
        : httpCode,
    body,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  };
}
