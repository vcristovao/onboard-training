export class AssertionInstructionFailure {
  public constructor(public readonly message: string) {}
}

export default function assert(
  value: boolean,
  message: string = "Assertion failed",
): asserts value {
  if (value) {
  } else {
    throw new AssertionInstructionFailure(message);
  }
}
