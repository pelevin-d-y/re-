import * as React from 'react'
import createTestLists from 'src/helpers/utils/create-test-lists'
import { useClient } from './ClientContext'

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

const setInitialLists = async (
  contacts: UserData[],
  dispatch: React.Dispatch<Action>
) => {
  const lists = createTestLists(contacts)
  dispatch({ type: 'SET_LISTS', lists })
}

const ListsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(listsReducer, null)
  const { state: clientState } = useClient()

  React.useEffect(() => {
    const setData = async () => {
      if (clientState.data?.contacts) {
        await setInitialLists(clientState.data?.contacts, dispatch)
      }
    }
    setData()
  }, [clientState.data?.contacts])

  const updateList = React.useCallback(
    async (list) => {
      const newLists =
        state?.map((stateList) => {
          if (stateList.id === list.id) {
            return list
          }
          return stateList
        }) || null

      dispatch({ type: 'SET_LISTS', lists: newLists })
    },
    [state]
  )

  const addList = React.useCallback(
    async (list: List) => {
      const newLists = [...(state as []), list]
      dispatch({ type: 'SET_LISTS', lists: newLists })
    },
    [state]
  )

  const removeList = React.useCallback(
    async (list: List) => {
      const newLists =
        state?.filter((stateList) => stateList.id !== list.id) || null

      dispatch({ type: 'SET_LISTS', lists: newLists })
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
