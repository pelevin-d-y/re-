export const arrayInsertItem = <T,>(
  arr: T[],
  index: number,
  newItem: T
): T[] => [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
