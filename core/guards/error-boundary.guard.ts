import { AzureFunction } from "@azure/functions";
import errorFactory from "../factories/error.factory";

/**
 * Any error thrown will be tried for the `message` property, and if it exists, it will be used as the error message
 * together with the `prefix`.
 *
 * For more specialized error handling, consider using `assertionFailureGuard`.
 * @param fn Azure Function to wrap
 * @param prefix Prefix to add before the error message
 * @param httpStatus HTTP status code to return in case of an error
 * @returns Another Azure Function that wraps the original function with a try-catch block
 */
export default function errorBoundaryGuard<
  T extends AzureFunction = AzureFunction,
>(fn: T, prefix: string = fn.name, httpStatus: number = 500): AzureFunction {
  return async function (context, ...args) {
    try {
      await fn(context, ...args);
    } catch (error) {
      let message: string;
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        message = error.message;
      } else {
        message = `${error}`;
      }
      context.res = errorFactory(
        prefix ? `${prefix}: ${message}` : message,
        httpStatus,
      );
    }
  };
}
