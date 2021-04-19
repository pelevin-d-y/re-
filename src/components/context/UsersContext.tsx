import { type } from 'node:os'
import * as React from 'react'

type Users = UserData[]
type Action = { type: 'UPDATE_DATA'; payload: Users }
type State = { data: Users }
type Dispatch = (action: Action) => void

const UsersContext = React.createContext<[State, Dispatch] | undefined>(
  undefined
)

const usersReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_DATA': {
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

const UsersProvider: React.FC = ({ children, ...props }) => {
  const [state, dispatch] = React.useReducer(usersReducer, {
    data: [],
  })

  const value: [State, Dispatch] = React.useMemo(() => [state, dispatch], [
    state,
  ])

  return (
    <UsersContext.Provider {...props} value={value}>
      {children}
    </UsersContext.Provider>
  )
}

type UseUsers = {
  updateUsersData: (payload: Users) => void
  dispatch: Dispatch
  state: State
}

const useUsers = (): UseUsers => {
  const context = React.useContext(UsersContext)
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  const [state, dispatch] = context
  const updateUsersData = (payload: Users) =>
    dispatch({ type: 'UPDATE_DATA', payload })

  return {
    updateUsersData,
    dispatch,
    state,
  }
}

export { UsersProvider, useUsers }
