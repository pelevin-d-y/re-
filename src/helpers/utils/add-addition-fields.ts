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

const addAdditionFields = (users: UserData[]): UserData[] => {
  const extendedUsers: UserData[] = users.map((user, i) => ({
    ...user,
    avatar: avatars[i % avatars.length],
    title: 'Investors', // example for list table
    notes: 'Plan Dinner', // example for list table
    next_outreach: 'Hi Hailey, Did get a chance to view the deck i sent ove...', // example for list table
    pinned: false,
    templateData: findTemplate(testTemplates, user.template),
    relationshipStrength: calculateColorByStraight(user.connection_E),
  }))

  const usersWithAdditionUsers: UserData[] = (
    [
      {
        ...extendedUsers[0],
        name: 'Thor Ernstsson',
        first_message_id: 'qweasd123123asdzxcqw:asdq',
        address: 'thor@casualcorp.com',
        avatar: 'thor.jpeg',
        recommendations: extendedUsers.slice(0, 3),
      },
    ] as UserData[]
  ).concat(extendedUsers)

  return usersWithAdditionUsers.map((user) => ({
    ...user,
    contacts: extendedUsers,
  }))
}

export default addAdditionFields
