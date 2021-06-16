const MAX_V = 54616
const MIN_V = -2468

export const normalizeStraight = (straight: string | number): number =>
  (Math.round(Number(straight)) - MIN_V) / (MAX_V - MIN_V)

export const calculateColorByStraight = (
  straight?: string | number
): 'red' | 'orange' | 'green' => {
  if (straight) {
    console.log('straight', Number(straight))
    normalizeStraight(straight)
    console.log('normalizeStraight(straight)', normalizeStraight(straight))
  }
  return 'red'
}
