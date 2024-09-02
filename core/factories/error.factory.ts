import { FunctionResponse } from "../models/function-response";
import { responseFactory } from "./response.factory";

export default function errorFactory(
  message: string,
  statusCode = 400,
): FunctionResponse {
  return responseFactory(
    {
      message,
    },
    statusCode,
  );
}
