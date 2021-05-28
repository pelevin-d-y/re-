import * as React from 'react'
import testLists from 'src/testLists'

type State = Lists | null
type Action =
  | {
      type: 'REMOVE_USERS_FROM_LIST'
      payload: { list: List; users: UserData[] }
    }
  | {
      type: 'ADD_USERS_TO_LIST'
      payload: { list: List; users: UserData[] }
    }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  removeUsersFromList: (list: List, users: UserData[]) => void
  addUsersToList: (list: List, users: UserData[]) => void
}

const ListsContext = React.createContext<ContextType | null>(null)

const listsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'REMOVE_USERS_FROM_LIST': {
      const { list, users } = action.payload

      const newLists = state?.map((item) => {
        if (item.id === list?.id) {
          const listUsers = item.users.filter(
            (user) =>
              !users.find(
                (selectedUser) => selectedUser.address === user.address
              )
          )
          return {
            ...item,
            users: listUsers,
          }
        }
        return item
      })

      return newLists === undefined ? null : newLists
    }

    case 'ADD_USERS_TO_LIST': {
      const { list, users } = action.payload
      const newLists = state?.map((item) => {
        if (item.id === list?.id) {
          return {
            ...item,
            users: [...item.users, ...users],
          }
        }
        return item
      })

      return newLists === undefined ? null : newLists
    }
    default: {
      return null
    }
  }
}

const ListsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(listsReducer, testLists)

  const removeUsersFromList = (list: List, users: UserData[]) => {
    dispatch({
      type: 'REMOVE_USERS_FROM_LIST',
      payload: { list, users },
    })
  }

  const addUsersToList = (list: List, users: UserData[]) => {
    dispatch({
      type: 'ADD_USERS_TO_LIST',
      payload: { list, users },
    })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      removeUsersFromList,
      addUsersToList,
    }),
    [state]
  )

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
}

const useLists = (): ContextType => {
  const context = React.useContext(ListsContext)
  if (context === null) {
    throw new Error('useLists must be used within a ListsProvider')
  }
  return context
}

export { ListsProvider, useLists }
