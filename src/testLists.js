/* eslint-disable prettier/prettier */
import testUsers from './testUsersWithPlaceholderFields.js'

export default [
  {
    "id": 0,
    "title": "Investors",  
    "description": "Contacts in the network of investing",
    "icon": "birthdayIcon.png",
    "users": testUsers.slice(0, 3)
  },
  {
    "id": 1,
    "title": "New Yorkers",  
    "description": "CEO administrators",
    "icon": "people.png",
    "users": testUsers.slice(5, 9),
  },
  {
    "id": 2,
    "title": "New Yorkers",  
    "description": "CEO administrators",
    "icon": "people.png",
    "users": testUsers.slice(2, 4),
  },
  {
    "id": 3,
    "title": "Administrators",  
    "description": "CEO administrators",
    "icon": "pathIcon.png",
    "users": testUsers.slice(4, 16),
  },
  {
    "id": 4,
    "title": "Finance Bros",  
    "description": "Your finance contacts",
    "icon": "birthdayIcon.png",
    "users": testUsers.slice(1, 4),
  },
  {
    "id": 5,
    "title": "Strategists",  
    "description": "Strategy contacts",
    "icon": "pens.png",
    "users": testUsers
  }
]