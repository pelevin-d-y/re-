import * as React from 'react'
import testUsers from 'src/testUsersWithPlaceholderFields.js'
import { get, set } from 'idb-keyval'

type Action = { type: 'UPDATE_USER_DATA'; payload: UserData }

type State = {
  data: UserData | null
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
        ...state,
        data: action.payload,
      }
    }
    default: {
      return {
        data: {},
      }
    }
  }
}

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, { data: null })

  React.useEffect(() => {
    get('client').then((val) => {
      if (val) {
        dispatch({ type: 'UPDATE_USER_DATA', payload: val })
      }
      set('client', testUsers[1])
        .then(() => {
          dispatch({ type: 'UPDATE_USER_DATA', payload: testUsers[1] })
          // eslint-disable-next-line no-console
          console.log('Set client success')
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('Set client err', err))
    })
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
