// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isNameEmail = (
  data: FormattedContact | RecommendationUser | MainUserData
): boolean => {
  if (typeof data.name === 'string') {
    return false
  }
  if ('name' in data && data.name) {
    return false
  }

  if ('emails' in data && data.emails) {
    if (data?.emails?.[0]?.meta?.original) {
      return true
    }

    if (data?.emails?.[0]?.data) {
      return true
    }
  }

  if ('address' in data && data.address) {
    return true
  }

  return false
}
