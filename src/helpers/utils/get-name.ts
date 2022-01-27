// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getName = (
  data: FormattedContact | RecommendationUser | MainUserData
): string => {
  if (typeof data.name === 'string') {
    return data.name
  }
  if ('name' in data && data.name) {
    return data.name.data.join(' ')
  }
  if ('emails' in data && data.emails) {
    if (data?.emails?.[0]?.meta?.original) {
      return data?.emails?.[0]?.meta?.original
    }
    if (data?.emails?.[0]?.data) {
      return data?.emails?.[0]?.data
    }
  }

  if ('address' in data && data.address) {
    return data.address
  }

  return ''
}
