/* eslint-disable prettier/prettier */
import testUsers from './testUsers.json'
import parseStringsToNumbers from './helpers/utils/parse-object'

const extendedUsers = testUsers.map((user) => ({
  ...parseStringsToNumbers(user),
  title: 'Investors',
  notes: 'Plan Dinner',
  next_outreach: 'Hi Hailey, Did get a chance to view the deck i sent ove...',
}))

export default extendedUsers.map((user) => ({
  ...user,
  contacts: extendedUsers,
}))
