const getRandomArray = <T>(array: T[], n: number): T[] => {
  const shuffled = array.sort(() => 0.5 - Math.random())
  let selected = shuffled.slice(0, n)
  return selected
}

export default getRandomArray
