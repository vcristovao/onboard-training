import { AzureFunction } from "@azure/functions";
import { AssertionInstructionFailure } from "../factories/assert-instruction.factory";
import errorFactory from "../factories/error.factory";

/**
 * Higher-order function that wraps an Azure Function with a try-catch block. If an
 * AssertionInstructionFailure is thrown, return a 400 response with the failed assertion.
 *
 * The most important fact about this function is that it will only catch AssertionInstructionFailure,
 * if other failures occur, they will be thrown again so other error handlers can take care of it,
 * such as query failures.
 *
 * When a query fails, typeORM will throw a QueryFailedError, which can be handled by the
 * `queryFailedGuard`. Thus, making it possible for these functions to be used in conjunction
 * with each other, and handling various types of errors with high throughput and low coupling.
 */
export default function assertionFailureGuard<
  T extends AzureFunction = AzureFunction,
>(fn: T, prefix: string = fn.name): AzureFunction {
  return async function (context, ...args) {
    try {
      await fn(context, ...args);
    } catch (error) {
      if (error instanceof AssertionInstructionFailure) {
        context.res = errorFactory(`${prefix}: ${error.message}`, 400);
        return;
      }
      throw error;
    }
  };
}
