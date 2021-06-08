import * as React from 'react'
import testLists from 'src/testLists'
import { get, set } from 'idb-keyval'

type State = Lists | null
type Action = {
  type: 'SET_LISTS'
  lists: State
}

type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  removeList: (list: List) => void
  addList: (list: List) => void
  updateList: (list: List) => void
}

const DB_STORE_NAME = 'lists'

const ListsContext = React.createContext<ContextType | null>(null)

const listsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LISTS': {
      return action.lists
    }

    default: {
      return null
    }
  }
}

const setInitialLists = async (dispatch: React.Dispatch<Action>) => {
  get(DB_STORE_NAME).then((val) => {
    if (val) {
      dispatch({ type: 'SET_LISTS', lists: val })
    } else {
      set(DB_STORE_NAME, testLists)
        .then(() => {
          dispatch({ type: 'SET_LISTS', lists: testLists })
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log('Set lists err', err))
    }
  })
}

const ListsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(listsReducer, null)

  React.useEffect(() => {
    setInitialLists(dispatch)
  }, [])

  const updateList = React.useCallback(
    async (list) => {
      const newLists =
        state?.map((stateList) => {
          if (stateList.id === list.id) {
            return list
          }
          return stateList
        }) || null

      set(DB_STORE_NAME, newLists)
        .then(() => {
          dispatch({ type: 'SET_LISTS', lists: newLists })
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    },
    [state]
  )

  const addList = React.useCallback(
    async (list: List) => {
      const newLists = [...(state as []), list]
      set(DB_STORE_NAME, newLists)
        .then(() => {
          dispatch({ type: 'SET_LISTS', lists: newLists })
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    },
    [state]
  )

  const removeList = React.useCallback(
    async (list: List) => {
      const newLists =
        state?.filter((stateList) => stateList.id !== list.id) || null

      set(DB_STORE_NAME, newLists)
        .then(() => {
          dispatch({ type: 'SET_LISTS', lists: newLists })
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    },
    [state]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      removeList,
      addList,
      updateList,
    }),
    [state, updateList, addList, removeList]
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
