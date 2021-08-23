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
  const extendedUsers: UserData[] = users.map((user, i) => ({
    ...user, // random avatar from avatars list
    avatar: avatars[i % avatars.length],
    title: 'Investors', // field used in the list table
    next_outreach: 'Hi Hailey, Did get a chance to view the deck i sent ove...', // field used in the list table
    pinned: false,
    templateData: findTemplate(testTemplates, user.template),
    relationshipStrength: calculateColorByStraight(user.connection_E),
  }))

  return extendedUsers
}

export default addAdditionFields
