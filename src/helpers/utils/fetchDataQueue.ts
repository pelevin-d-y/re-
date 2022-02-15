/* eslint-disable no-await-in-loop */
export const fetchDataQueue = async <T>(
  promises: (() => Promise<T>)[],
  reqsPerTime = 8
): Promise<T[]> => {
  let allResponses: T[] = []
  while (promises.length) {
    const responses = await Promise.all(
      promises.splice(0, reqsPerTime).map((f) => f())
    )
    allResponses = [...allResponses, ...responses]
  }
  return allResponses
}
