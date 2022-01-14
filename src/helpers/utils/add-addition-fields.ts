import findTemplate from 'src/helpers/utils/find-template'
import { calculateColorByStraight } from 'src/helpers/utils/calculate-strength'
import testTemplates from 'src/testTemplates.json'
import { getAvatarUrl } from '../variables'

const addAdditionFields = (users: RecommendationUser[]): UserData[] => {
  const extendedUsers: UserData[] = users.map((user) => ({
    ...user,
    avatar: user.contact_id ? getAvatarUrl(user.contact_id) : '',
    templateData: findTemplate(testTemplates, user.template),
    relationshipStrength: calculateColorByStraight(user.connection_E),
  }))

  return extendedUsers
}

export default addAdditionFields
