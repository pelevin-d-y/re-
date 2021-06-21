/* eslint-disable prettier/prettier */
import findTemplate from 'src/helpers/utils/find-template'
import { calculateColorByStraight } from 'src/helpers/utils/calculate-strength'
import testTemplates from 'src/testTemplates.json'
import testUsers from './testUsers.json'
import parseStringsToNumbers from './helpers/utils/parse-object'

const extendedUsers = testUsers.map((user) => ({
  ...parseStringsToNumbers(user),
  title: 'Investors',
  notes: 'Plan Dinner',
  next_outreach: 'Hi Hailey, Did get a chance to view the deck i sent ove...',
  templateData: findTemplate(testTemplates, user.template),
  relationshipStrength: calculateColorByStraight(user.connection_E),
}))

export default extendedUsers.map((user) => ({
  ...user,
  contacts: extendedUsers,
}))
