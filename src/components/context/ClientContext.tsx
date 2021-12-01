import * as React from 'react'
import { get } from 'src/api'
import addAdditionFields from 'src/helpers/utils/add-addition-fields'
import formatContactData from 'src/helpers/utils/format-contact-data'

type Action =
  | { type: 'UPDATE_USER_DATA'; payload: MainUserData }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }

type State = {
  data: MainUserData | null
  isLoading: boolean
}

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
  updateUserData: () => void
}

const ClientContext = React.createContext<ContextType | null>(null)

const clientReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const addAuthData = (clientData: MainUserData, authData: any): MainUserData => {
  const data: MainUserData = {
    ...clientData,
    authData,
    syncedEmails: [],
  }

  Object.entries(authData).forEach(([email, status]) => {
    if (status === 2) {
      if (data.syncedEmails) {
        data.syncedEmails.push(email)
      }
    }
  })
  return data
}

const getMainUserData = async () => {
  const requests = await Promise.all([
    get.getRecommendations(),
    get.getContact(),
    get.getAuth(),
  ])

  const [recommendations, contactResponse, authResponse] = requests
  const extendedUsers = addAdditionFields(recommendations)
  const formattedClientData = formatContactData(contactResponse)
  const clientData = addAuthData(formattedClientData, authResponse)
  const mainUserData: MainUserData = {
    ...clientData,
    contacts: extendedUsers, // have to remove when API is fixed
  }

  return mainUserData
}

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, {
    isLoading: true,
    data: null,
  })

  React.useEffect(() => {
    const setClientData = async () => {
      try {
        updateIsLoading(true)
        const mainUserData = await getMainUserData()
        dispatch({
          type: 'UPDATE_USER_DATA',
          payload: mainUserData,
        })

        updateIsLoading(false)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('setClientData err', err)
      }
    }

    setClientData()
  }, [])

  const authData = React.useMemo(
    () => state.data?.authData,
    [state.data?.authData]
  )

  React.useEffect(() => {
    const setAuthUrlsData = async () => {
      try {
        if (authData) {
          const authUrls = await get.getAuthUrl([...Object.keys(authData), ''])

          dispatch({
            type: 'UPDATE_USER_DATA',
            payload: { ...state.data, authUrls },
          })
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('authUrls err', err)
      }
    }

    setAuthUrlsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData])

  const updateIsLoading = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_LOADING',
      payload: value,
    })
  }

  const updateUserData = async () => {
    const mainUserData = await getMainUserData()
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: mainUserData,
    })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      updateIsLoading,
      updateUserData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
