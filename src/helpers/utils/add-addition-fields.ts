import findTemplate from 'src/helpers/utils/find-template'
import { calculateColorByStraight } from 'src/helpers/utils/calculate-strength'
import testTemplates from 'src/testTemplates.json'

const addAdditionFields = (users: RecommendationUser[]): UserData[] => {
  const extendedUsers: UserData[] = users.map((user) => ({
    ...user,
    avatar: user.contact_id
      ? `https://d1vi0xe0gbvwgr.cloudfront.net/contact_images/${user.contact_id}.jpg`
      : '',
    templateData: findTemplate(testTemplates, user.template),
    relationshipStrength: calculateColorByStraight(user.connection_E),
  }))

  return extendedUsers
}

export default addAdditionFields
