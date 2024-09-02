import { AzureFunction } from "@azure/functions";
import { QueryFailedError } from "typeorm";
import errorFactory from "../factories/error.factory";
import { HttpStatusCode } from "azure-functions-ts-essentials";

/**
 * Run `fn` within a try-catch block. If a QueryFailedError is thrown, return a 400 response
 * with the failed query error.
 *
 * @param fn Input azure function
 * @returns Azure function with query failed guard
 */
export default function queryFailedGuard<
  T extends AzureFunction = AzureFunction,
>(fn: T): AzureFunction {
  return async function (context, req) {
    try {
      await fn(context, req);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        context.res = errorFactory(error.message, HttpStatusCode.BadRequest);
        return;
      }
      let body: string;
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        body = error.message;
      } else {
        body = `${error}`;
      }
      context.res = errorFactory(body, HttpStatusCode.InternalServerError);
    }
  };
}
