/* eslint-disable prettier/prettier */
import testUsers from './testUsers.json'

const newTestUsers = testUsers.map((user) => ({
  ...user,
  title: 'Investors',
  contacts: testUsers,
  notes: 'Plan Dinner',
  next_outreach: 'Hi Hailey, Did get a chance to view the deck i sent ove...',
}))

export default newTestUsers
