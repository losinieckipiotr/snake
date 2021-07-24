export function constrain (number: number, minMax: [number, number]): number {
  const [min, max] = minMax
  if (isNaN(min) || isNaN(max)) {
    return NaN
  }

  if (number < min) {
    return NaN
  }

  if (number > max) {
    return NaN
  }

  return number
}
