import React, { useCallback, useEffect } from 'react'
import { get, post } from 'src/api'

type Action =
  | { type: 'UPDATE_PINNED_DATA'; payload: any }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
type State = { data: any[]; isLoading: boolean }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  addPinned: (data: any) => any
  removePinned: (data: any) => any
  dispatch: Dispatch
}

const PinnedContext = React.createContext<ContextType | null>(null)

const pinnedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PINNED_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default: {
      return {
        data: [],
        isLoading: false,
      }
    }
  }
}

const PinnedProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(pinnedReducer, {
    data: [],
    isLoading: false,
  })

  const updatePinnedData = async () => {
    const pinnedResponse = await get.getPinnedContacts()
    dispatch({ type: 'UPDATE_PINNED_DATA', payload: pinnedResponse })
  }

  useEffect(() => {
    dispatch({ type: 'UPDATE_IS_LOADING', payload: true })
    updatePinnedData()
    dispatch({ type: 'UPDATE_IS_LOADING', payload: false })
  }, [])

  const addPinned = useCallback(
    async (data: any) => {
      if (state.data.find((item) => data.key === item.key)) {
        return null
      }
      await post.postPinnedContacts([...state.data, data])
      await updatePinnedData()
      return null
    },
    [state.data]
  )

  const removePinned = useCallback(
    async (data: any) => {
      await post.postPinnedContacts(
        state.data.filter((item) => item.key !== data.key)
      )
      await updatePinnedData()
      return null
    },
    [state.data]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      addPinned,
      removePinned,
      dispatch,
    }),
    [addPinned, removePinned, state]
  )

  return (
    <PinnedContext.Provider value={value}>{children}</PinnedContext.Provider>
  )
}

const usePinned = (): ContextType => {
  const context = React.useContext(PinnedContext)
  if (context === null) {
    throw new Error('useTemplates must be used within a PinnedProvider')
  }
  return context
}

export { PinnedProvider, usePinned }
