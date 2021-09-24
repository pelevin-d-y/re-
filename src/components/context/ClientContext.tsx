import * as React from 'react'
import { useQuery } from 'react-query'
import { getMainUserQuery } from 'src/api/queries'

type Action = { type: 'UPDATE_USER_DATA'; payload: MainUserData }

type State = MainUserData | undefined

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
  updateUserData: (data: MainUserData) => void
}

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

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, undefined)

  const mainUserData = useQuery(getMainUserQuery())

  React.useEffect(() => {
    if (mainUserData.data) {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: mainUserData.data,
      })
    }
  }, [mainUserData.data])

  const updateUserData = async (data: MainUserData) => {
    dispatch({ type: 'UPDATE_USER_DATA', payload: data })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      query: mainUserData.data,
      updateUserData,
    }),
    [mainUserData.data, state]
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
