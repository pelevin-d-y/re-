import * as React from 'react'
import { get, set } from 'idb-keyval'
import { getAuth, getContact, getRecommendations } from 'src/api'
import addAdditionFields from 'src/helpers/utils/add-addition-fields'
import testUsers from 'src/testUsers.json'

type Action = { type: 'UPDATE_USER_DATA'; payload: MainUserData }

type State = MainUserData | null

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
  updateUserData: (data: MainUserData) => void
}

const DB_STORE_NAME = 'client'

const ClientContext = React.createContext<ContextType | null>(null)

const clientReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const getMainUserData = async () => {
  const requests = await Promise.all([
    getRecommendations(),
    getContact(),
    getAuth(),
  ])

  const [recommendations, contactResponse, authResponse] = requests
  const extendedUsers = addAdditionFields(recommendations)

  const mainUserData: MainUserData = {
    emails: contactResponse.data.flatMap((item: any) =>
      item.type === 'email' ? item.data : []
    ),
    shortName: contactResponse.data.flatMap((item: any) =>
      item.type === 'name_short' ? item.data : []
    )[0],
    fullName: contactResponse.data.flatMap((item: any) =>
      item.type === 'name' ? item.data.join(' ') : []
    )[0],
    avatar: 'thor.jpeg',
    contacts:
      extendedUsers.length < 10 ? addAdditionFields(testUsers) : extendedUsers, // have to remove when API is fixed
    strataEmail: Object.keys(authResponse.data)[0],
  }

  return mainUserData
}

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, null)

  React.useEffect(() => {
    const setClientData = async () => {
      try {
        const clientData = await get('client')
        if (clientData) {
          dispatch({ type: 'UPDATE_USER_DATA', payload: clientData })
        } else {
          const mainUserData = await getMainUserData()
          await set('client', mainUserData)
          dispatch({
            type: 'UPDATE_USER_DATA',
            payload: mainUserData,
          })
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('setClientData err', err)
        // eslint-disable-next-line no-console
        console.log('set testUsers')
        const extendedUsers = addAdditionFields(testUsers)
        const mainUserData = {
          avatar: 'thor.jpeg',
          emails: [
            'thor@casualcorp.com',
            'thor@alphahq.com',
            'thor@strata.cc',
            'thor@alpha-ux.co',
          ],
          fullName: 'Thor Ernstsson',
          shortName: 'Thor',
          contacts: extendedUsers,
          strataEmail: 'strata.test0@gmail.com',
        }

        await set('client', mainUserData)
        dispatch({
          type: 'UPDATE_USER_DATA',
          payload: mainUserData,
        })
      }
    }

    setClientData()
  }, [])

  const updateUserData = async (data: MainUserData) => {
    set(DB_STORE_NAME, data)
      .then(() => {
        dispatch({ type: 'UPDATE_USER_DATA', payload: data })
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err))
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      updateUserData,
    }),
    [state]
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}

const useClient = (): ContextType => {
  const context = React.useContext(ClientContext)
  if (context === null) {
    throw new Error('useClient must be used within a clientProvider')
  }
  return context
}

export { ClientProvider, useClient }
