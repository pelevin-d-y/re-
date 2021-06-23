const createTestLists = (users: UserData[]) => [
  {
    id: 0,
    title: 'Investors',
    description: 'Contacts in the network of investing',
    icon: 'birthdayIcon.png',
    users: users.slice(0, 3),
  },
  {
    id: 1,
    title: 'New Yorkers',
    description: 'CEO administrators',
    icon: 'people.png',
    users: testUsers.slice(5, 9),
  },
  {
    id: 2,
    title: 'New Yorkers',
    description: 'CEO administrators',
    icon: 'people.png',
    users: users.slice(2, 4),
  },
  {
    id: 3,
    title: 'Administrators',
    description: 'CEO administrators',
    icon: 'pathIcon.png',
    users: users.slice(4, 16),
  },
  {
    id: 4,
    title: 'Finance Bros',
    description: 'Your finance contacts',
    icon: 'birthdayIcon.png',
    users: users.slice(1, 4),
  },
  {
    id: 5,
    title: 'Strategists',
    description: 'Strategy contacts',
    icon: 'pens.png',
    users,
  },
  {
    id: 6,
    title: 'Your Upcoming Trip to Los Angeles',
    description:
      'Plan your trip ahead but scheduling meetings with contacts in LA',
    icon: 'pens.png',
    users: users.slice(10, 16),
  },
  {
    id: 7,
    title: '1 Year…',
    description: 'It’s been',
    icon: 'people.png',
    users: users.filter((user) => user.template === '1 Year'),
  },
  {
    id: 8,
    title: '90 Days…',
    description: 'It’s been',
    icon: 'people.png',
    users: users.filter((user) => user.template === '3 Months'),
  },
  {
    id: 9,
    title: 'Your meeting with Company X',
    description: 'February 12, 2021 - Frontend Round table',
    icon: 'people.png',
    users: users.slice(0, 6),
  },
]

export default createTestLists
