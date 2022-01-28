import { getName } from './get-name'

export const customSortType =
  () =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (
    rowA: { original: { [x: string]: FormattedContact } },
    rowB: { original: { [x: string]: FormattedContact } }
  ) => {
    let a = getName(rowA?.original).toLocaleLowerCase()
    let b = getName(rowB?.original).toLocaleLowerCase()

    if (a > b) return 1
    if (b > a) return -1
    return 0
  }
