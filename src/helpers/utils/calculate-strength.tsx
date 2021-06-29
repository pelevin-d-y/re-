const MAX_V = 54616
const MIN_V = -2468
const delta = MAX_V - MIN_V

export const normalizeStraight = (strength: string | number): number =>
  (Math.round(Number(strength)) - MIN_V) / delta

export const calculateColorByStraight = (
  strength?: string | number
): 'red' | 'orange' | 'green' | null => {
  if (strength) {
    const normalizedStraightValue = Number(
      normalizeStraight(strength).toFixed(2)
    )
    if (normalizedStraightValue <= 0.33) {
      return 'green'
    }
    if (normalizedStraightValue >= 0.66) {
      return 'red'
    }
    return 'orange'
  }
  return null
}
