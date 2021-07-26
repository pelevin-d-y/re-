// This is auxiliary context to help pass data to MultiEmails modal
// Need to remove it and pass Users in another way because this is overhead

import * as React from 'react'
import { intersectionBy } from 'lodash'
import { useClient } from './ClientContext'

type Users = UserData[]
type Action = { type: 'UPDATE_USERS_DATA'; payload: Users }
type State = { data: Users | null }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
}

const UsersContext = React.createContext<ContextType | null>(null)

const usersReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USERS_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return {
        data: [],
      }
    }
  }
}

const UsersProvider: React.FC = ({ children }) => {
  const { state: clientState } = useClient()

  const [state, dispatch] = React.useReducer(usersReducer, {
    data: clientState?.contacts || null,
  })

  React.useEffect(() => {
    const newArray = intersectionBy(
      clientState?.contacts || [],
      state.data || [],
      (item) => item.address
    )

    dispatch({
      type: 'UPDATE_USERS_DATA',
      payload: newArray,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientState])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

const useUsers = (): ContextType => {
  const context = React.useContext(UsersContext)
  if (context === null) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}

export { UsersProvider, useUsers }
