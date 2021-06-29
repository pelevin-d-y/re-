import * as React from 'react'

type Users = UserData[]
type Action = { type: 'UPDATE_SELECTED_USERS'; payload: Users }
type State = { data: Users }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
}

const TableContext = React.createContext<ContextType | null>(null)

const tableReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_USERS': {
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

const TableProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(tableReducer, {
    data: [],
  })

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

const useTable = (): ContextType => {
  const context = React.useContext(TableContext)
  if (context === null) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}

export { TableProvider, useTable }
