import * as React from 'react'
import testUsers from 'src/testUsersWithPlaceholderFields.js'

type Users = UserData[]
type Action = { type: 'UPDATE_USERS_DATA'; payload: Users }
type State = { data: Users }
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
  const [state, dispatch] = React.useReducer(usersReducer, {
    data: testUsers,
  })

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
