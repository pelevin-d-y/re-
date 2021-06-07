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
  removeList: (dispatch: Dispatch, lists: State, list: List) => void
  addList: (dispatch: Dispatch, lists: State, list: List) => void
  updateList: (dispatch: Dispatch, lists: State, list: List) => void
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

const removeList = async (dispatch: Dispatch, lists: State, list: List) => {
  const newLists =
    lists?.filter((stateList) => stateList.id !== list.id) || null

  set(DB_STORE_NAME, newLists)
    .then(() => {
      dispatch({ type: 'SET_LISTS', lists: newLists })
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err))
}

const addList = async (dispatch: Dispatch, lists: State, list: List) => {
  const newLists = [...(lists as []), list]
  set(DB_STORE_NAME, newLists)
    .then(() => {
      dispatch({ type: 'SET_LISTS', lists: newLists })
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err))
}

const updateList = async (dispatch: Dispatch, lists: State, list: List) => {
  const newLists =
    lists?.map((stateList) => {
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
}

const ListsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(listsReducer, null)

  React.useEffect(() => {
    setInitialLists(dispatch)
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      removeList,
      addList,
      updateList,
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
