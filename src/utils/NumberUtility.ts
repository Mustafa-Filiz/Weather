class NumberUtility {
  static roundNumber(num?: number): number {
    if (!num) return 0
    return Math.round(num)
  }

  static findMin(arr?: number[]): number {
    if (!arr || arr.length === 0) return 0
    return Math.min(...arr)
  }

  static findMax(arr?: number[]): number {
    if (!arr || arr.length === 0) return 0
    return Math.max(...arr)
  }
}

export default NumberUtility
