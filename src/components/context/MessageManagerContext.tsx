import * as React from 'react'

type State = SendMessageData

type Action = { type: 'updateData'; payload: SendMessageData }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
}

const ManagerContext = React.createContext<ContextType | null>(null)

const initialState = {
  from_address: '',
  body: '',
  to_contact_list: [],
  cc_contact_list: [],
  bcc_contact_list: [],
  reply_to_contact_list: [],
}

const managerReducer = (state: SendMessageData, action: Action) => {
  switch (action.type) {
    case 'updateData':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return initialState
  }
}

const ManagerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(managerReducer, initialState)

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>
  )
}

const useManager = (): ContextType => {
  const context = React.useContext(ManagerContext)
  if (context === null) {
    throw new Error('useManager must be used within a UsersProvider')
  }
  return context
}

export { ManagerProvider, useManager }
