import findTemplate from 'src/helpers/utils/find-template'
import { calculateColorByStraight } from 'src/helpers/utils/calculate-strength'
import testTemplates from 'src/testTemplates.json'

const avatars = [
  'gino.jpeg',
  'maker.jpeg',
  'james.png',
  'mary.jpeg',
  'phil.jpeg',
  'steve.jpeg',
]

const addAdditionFields = (users: RecommendationUser[]): UserData[] => {
  const extendedUsers: UserData[] = users.map((user) => ({
    ...user,
    avatar: `https://d1vi0xe0gbvwgr.cloudfront.net/contact_images/${user.contact_id}.jpg`,
    title: 'Investors', // field used in the list table
    pinned: false,
    templateData: findTemplate(testTemplates, user.template),
    relationshipStrength: calculateColorByStraight(user.connection_E),
  }))

  return extendedUsers
}

export default addAdditionFields
