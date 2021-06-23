import * as React from 'react'
import { get, set } from 'idb-keyval'
import { apiGet } from 'src/api'
import addAdditionFields from 'src/helpers/utils/add-addition-fields'

type Action = { type: 'UPDATE_USER_DATA'; payload: UserData }

type State = {
  data: UserData | null
  isLoading: boolean
}

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const ClientContext = React.createContext<ContextType | null>(null)

const clientReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        data: {
          ...state.data,
          ...action.payload,
        },
        isLoading: false,
      }
    }
    default: {
      return state
    }
  }
}

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, {
    data: null,
    isLoading: false,
  })

  React.useEffect(() => {
    const setClientData = async () => {
      try {
        const clientData = await get('client')
        if (clientData) {
          dispatch({ type: 'UPDATE_USER_DATA', payload: clientData })
        } else {
          const { data: clientRecommendations } = await apiGet(
            '/recommendations?client=Thor_Ernstsson&number=20'
          )
          const extendedUsers = addAdditionFields(clientRecommendations)
          await set('client', extendedUsers[1])
          dispatch({ type: 'UPDATE_USER_DATA', payload: extendedUsers[1] })
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('err', err)
      }
    }

    setClientData()
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
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
