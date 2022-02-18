import React, { useCallback, useEffect } from 'react'
import { get, post } from 'src/api'

type Action =
  | { type: 'UPDATE_HAS_LOADED'; payload: boolean }
  | { type: 'UPDATE_DATA'; payload: any }
  | { type: 'SET_WELCOME_QUESTIONNAIRE_SHOWN'; payload: boolean }
type State = FreeStorage & {
  hasFreeStorageLoaded: boolean
}
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  updateFreeStorage: (data: any) => any
  dispatch: Dispatch
}

const FreeStorageContext = React.createContext<ContextType | null>(null)

const initialState = {
  hasFreeStorageLoaded: false,
  pinned: [],
  product_tour_shown: false,
  welcome_questionnaire_shown: false,
}

const pinnedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_DATA': {
      return {
        ...state,
        ...action.payload,
      }
    }
    case 'SET_WELCOME_QUESTIONNAIRE_SHOWN': {
      return {
        ...state,
        welcome_questionnaire_shown: action.payload,
      }
    }
    case 'UPDATE_HAS_LOADED': {
      return {
        ...state,
        hasFreeStorageLoaded: action.payload,
      }
    }
    default: {
      return initialState
    }
  }
}

const FreeStorageProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(pinnedReducer, initialState)

  const fetchFreeStorage = async () => {
    const freeStorageResponse = await get.getFreeStorage()
    dispatch({ type: 'UPDATE_DATA', payload: freeStorageResponse })
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchFreeStorage()
      dispatch({ type: 'UPDATE_HAS_LOADED', payload: true })
    }

    fetchDataAsync()
  }, [])

  const updateFreeStorage = useCallback(async (data: FreeStorage) => {
    await post.postFreeStorage(data)
    dispatch({ type: 'UPDATE_DATA', payload: data })
    return null
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      updateFreeStorage,
      dispatch,
    }),
    [updateFreeStorage, state]
  )

  return (
    <FreeStorageContext.Provider value={value}>
      {children}
    </FreeStorageContext.Provider>
  )
}

const useFreeStorage = (): ContextType => {
  const context = React.useContext(FreeStorageContext)
  if (context === null) {
    throw new Error('useFreeStorage must be used within a FreeStorageProvider')
  }
  return context
}

export { FreeStorageProvider, useFreeStorage }
