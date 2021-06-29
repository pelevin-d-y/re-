// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const parseStringsToNumbers = (obj: any): any => {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'string') {
      const newVal = val.replace(/,/g, '.')
      if (!Number.isNaN(Number(newVal))) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = Number(newVal)
      }
    }
  })
  return obj
}

export default parseStringsToNumbers
