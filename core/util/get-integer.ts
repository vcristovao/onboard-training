/**
 * Get valid 32-bit (un)signed integer from string.
 * No NaN, Infinity, or fractional numbers goes by.
 */
export default function getInteger(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }
  const parsed =
    // If a number is passed, still validate it as usual
    typeof value === "number" ? value : parseInt(value, 10);
  if (isNaN(parsed) || !isFinite(parsed)) {
    return null;
  }
  return parsed;
}
