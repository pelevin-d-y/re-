export const customSortType =
  () =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (
    rowA: { original: { [x: string]: string } },
    rowB: { original: { [x: string]: string } },
    columnId: string | number
  ) => {
    const a = rowA?.original[columnId]?.toLowerCase()
    const b = rowB?.original[columnId]?.toLowerCase()
    if (a > b) return 1
    if (b > a) return -1
    return 0
  }
