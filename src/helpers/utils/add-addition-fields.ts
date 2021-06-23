import findTemplate from 'src/helpers/utils/find-template'
import parseStringsToNumbers from 'src/helpers/utils/parse-object'
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

const addAdditionFields = (users: UserData[]): UserData[] => {
  const extendedUsers = users.map((user, i) => ({
    ...parseStringsToNumbers(user),
    avatar: avatars[i % avatars.length],
    title: 'Investors',
    notes: 'Plan Dinner',
    next_outreach: 'Hi Hailey, Did get a chance to view the deck i sent ove...',
    templateData: findTemplate(testTemplates, user.template),
    relationshipStrength: calculateColorByStraight(user.connection_E),
  }))
  return extendedUsers.map((user) => ({
    ...user,
    contacts: extendedUsers,
  }))
}

export default addAdditionFields
