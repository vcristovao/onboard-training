import { AzureFunction } from "@azure/functions";
import { AssertionInstructionFailure } from "../factories/assert-instruction.factory";
import errorFactory from "../factories/error.factory";

/**
 * Higher-order function that wraps an Azure Function with a try-catch block. If an
 * AssertionInstructionFailure is thrown, return a 400 response with the failed assertion.
 */
export default function assertionFailureGuard<
  T extends AzureFunction = AzureFunction,
>(fn: T): AzureFunction {
  return async function (context, ...args) {
    try {
      await fn(context, ...args);
    } catch (error) {
      if (error instanceof AssertionInstructionFailure) {
        context.res = errorFactory(error.message, 400);
        return;
      }
      throw error;
    }
  };
}
