export const users: UserData[] = [
  {
    id: 1,
    avatar: require('public/images/gino.jpeg'),
    name: 'Landon Tucker',
    position: 'Founder at Company X',
    event: 'Asked a question',
    lastMessage:
      'Landon intro-ed Ari Kieth last week, follow up with Landon on how the meeting went with her.',
  },
  {
    id: 2,
    avatar: require('public/images/maker.jpeg'),
    name: 'Taylor Smith',
    position: 'Founder at Company X',
    event: 'Taylor is based in LA',
    lastMessage:
      'Mary asked you for the All Hands presentation from last week’s Town Hall. Send it over!',
  },
  {
    id: 3,
    avatar: require('public/images/mary.jpeg'),
    name: 'Gino Mo',
    position: 'Founder at Company X',
    event: 'Gino took you to dinner',
    lastMessage:
      'Gino asked if you’re free next week to grab dinner in the east village. Set a date!',
  },
  {
    id: 4,
    avatar: require('public/images/james.png'),
    name: 'James Malone',
    position: 'Founder at Company X',
    event: 'James is based in LA',
    lastMessage:
      'Question: “What is the valuation of company X if they were to raise another round at $X?”',
  },
  {
    id: 5,
    avatar: require('public/images/phil.jpeg'),
    name: 'Mary Smith',
    position: 'Founder at Company X',
    event: 'Mary has a startup in LA',
    lastMessage:
      'Gino asked if you’re free next week to grab dinner in the east village. Set a date!',
  },
  {
    id: 6,
    avatar: require('public/images/steve.jpeg'),
    name: 'Steve Lee',
    position: 'Founder at Company X',
    event: 'Requested deck',
    lastMessage:
      'Thank Steve for sharing his works during the Creative Soundable last Wednesday.',
  },
  {
    id: 7,
    avatar: require('public/images/maker.jpeg'),
    name: 'Phil Hoyt',
    position: 'Founder at Company X',
    event: 'Asked for Dinner',
    lastMessage:
      'Thank Steve for sharing his works during the Creative Soundable last Wednesday.',
  },
]

type Client = {
  name: string
}

export const client: Client = {
  name: 'Denis Pelevin',
}

export const playlists: Playlists = [
  'Meetings & Events',
  'Follow Ups',
  'Birthdays',
  'New Roles',
  'Time Lapsed: 90 Days',
  'Time Lapsed: 1 Year',
  'Travel: Who to Meet',
  'Relocation',
  'Holidays',
  'Share Strata',
  'Checking Emails',
  'Intros received',
  'Network Engagement',
  'Network Maintenance',
]
