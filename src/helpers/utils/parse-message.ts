const parseEmailMessage = (
  string: string,
  contactName?: string,
  clientName?: string
): string => {
  const comparator = new Map()
  comparator.set('<Contact Name>', contactName)
  comparator.set('<Client Name>', clientName)
  comparator.set(/(\r\n|\r|\n)/g, '<br />')

  let newString = string
  if (newString) {
    comparator.forEach((value, key) => {
      newString = newString.replaceAll(key, value)
    })
  }
  return newString
}

export default parseEmailMessage
