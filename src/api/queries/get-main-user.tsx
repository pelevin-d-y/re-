import { UseQueryOptions } from 'react-query'
import addAdditionFields from 'src/helpers/utils/add-addition-fields'
import formatContactData from 'src/helpers/utils/format-contact-data'
import testUsers from 'src/testUsers.json'
import { get } from '../requests'

const addAuthData = (clientData: MainUserData, authData: any): MainUserData => {
  const data: MainUserData = {
    ...clientData,
    authData,
    syncedEmails: [],
    unsyncEmails: [],
  }

  Object.entries(authData).forEach(([email, status]) => {
    if (status === 2) {
      if (data.syncedEmails) {
        data.syncedEmails.push(email)
      }
    }
    if (status === 1) {
      if (data.unsyncEmails) {
        data.unsyncEmails.push(email)
      }
    }
  })

  return data
}

const getMainUserData = ([recommendations, contact, auth]: [
  RecommendationUser[],
  GetContactResp,
  Record<string, unknown>
]): MainUserData => {
  const extendedUsers = addAdditionFields(recommendations)
  const formattedClientData = formatContactData(contact)
  const clientData = addAuthData(formattedClientData, auth)

  const mainUserData: MainUserData = {
    ...clientData,
    contacts:
      extendedUsers.length < 10 ? addAdditionFields(testUsers) : extendedUsers, // have to remove when API is fixed
  }

  return mainUserData
}

const getMainUserQuery = (): UseQueryOptions<MainUserData> => ({
  queryKey: ['mainUserData'],
  queryFn: () =>
    Promise.all([
      get.getRecommendations(),
      get.getContact(),
      get.getAuth(),
    ]).then((res) => getMainUserData(res)),
})

export default getMainUserQuery
