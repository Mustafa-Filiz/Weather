class NumberUtility {
  static roundNumber(num: number | undefined): number | undefined {
    if (!num) return undefined
    return Math.round(num)
  }
}

export default NumberUtility
