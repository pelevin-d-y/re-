import * as React from 'react'

type Users = UserData[]
type Action = { type: 'UPDATE_DATA'; payload: Users }
type State = { data: Users }
type Dispatch = (action: Action) => void

const PlaylistContext = React.createContext<[State, Dispatch] | undefined>(
  undefined
)

const popupReducer = (state: State, action: Action): State => {
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

const UsersProvider = (
  props: JSX.IntrinsicAttributes & React.ProviderProps<State | undefined>
): JSX.Element => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    data: [],
  })

  const value: [State, Dispatch] = React.useMemo(() => [state, dispatch], [
    state,
  ])

  return <PlaylistContext.Provider {...props} value={value} />
}

interface UseUsers {
  updateUsersData: (payload: Users) => void
  dispatch: Dispatch
  state: State
}

const useUsers = (): UseUsers => {
  const context = React.useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error('usePopup must be used within a CountProvider')
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
