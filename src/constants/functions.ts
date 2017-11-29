// rounds to two decimals, with 0.5 rounding up.
// Javascript doesn't care about mathematical conventions, so this is in its own file in case something breaks in the future
export function roundToTwoDecimals(n: number): number {
    return parseFloat((n + 0.00001).toFixed(2));
}
