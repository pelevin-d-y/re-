import * as React from 'react'
import testLists from 'src/testLists'
import { get, set } from 'idb-keyval'

type State = Lists | null
type Action =
  | {
      type: 'SET_LISTS'
      payload: { lists: Lists }
    }
  | {
      type: 'REMOVE_USERS_FROM_LIST'
      payload: { list: List; users: UserData[] }
    }
  | {
      type: 'ADD_LIST'
      payload: { list: List }
    }
  | {
      type: 'UPDATE_LIST'
      payload: { list: List }
    }
  | {
      type: 'REMOVE_LIST'
      payload: { list: List }
    }

type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
}

const DB_STORE_NAME = 'lists'

const ListsContext = React.createContext<ContextType | null>(null)

const listsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LISTS': {
      return action.payload.lists
    }

    case 'ADD_LIST': {
      const { list } = action.payload
      const newState = [...(state as []), list]
      set(DB_STORE_NAME, newState)
      return newState
    }

    case 'REMOVE_LIST': {
      const { list } = action.payload
      if (state) {
        const newState = state?.filter((stateList) => stateList.id !== list.id)
        set(DB_STORE_NAME, newState)
        return newState
      }
      return null
    }

    case 'UPDATE_LIST': {
      const { list } = action.payload
      const newLists =
        state?.map((stateList) => {
          if (stateList.id === list.id) {
            return list
          }
          return stateList
        }) || null

      set(DB_STORE_NAME, newLists)
      return newLists
    }

    case 'REMOVE_USERS_FROM_LIST': {
      const { list, users } = action.payload

      const newLists =
        state?.map((item) => {
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
        }) || null

      set(DB_STORE_NAME, newLists)
      return newLists
    }

    default: {
      return null
    }
  }
}

const ListsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(listsReducer, null)

  React.useEffect(() => {
    get(DB_STORE_NAME).then((val) => {
      if (val) {
        dispatch({ type: 'SET_LISTS', payload: { lists: val } })
      } else {
        set(DB_STORE_NAME, testLists)
          .then(() => {
            dispatch({ type: 'SET_LISTS', payload: { lists: testLists } })
          })
          // eslint-disable-next-line no-console
          .catch((err) => console.log('Set lists err', err))
      }
    })
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
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
