const MAX_V = 54616
const MIN_V = -2468
const delta = MAX_V - MIN_V

export const normalizeStraight = (straight: string | number): number =>
  (Math.round(Number(straight)) - MIN_V) / delta

export const calculateColorByStraight = (
  straight?: string | number
): 'red' | 'orange' | 'green' | null => {
  if (straight) {
    const normalizedStraightValue = Number(
      normalizeStraight(straight).toFixed(2)
    )
    if (normalizedStraightValue <= 0.33) {
      return 'green'
    }
    if (normalizedStraightValue <= 0.66) {
      return 'red'
    }
    return 'orange'
  }
  return null
}
