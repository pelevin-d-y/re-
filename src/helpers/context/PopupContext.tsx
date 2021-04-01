import * as React from 'react'

type Data = { [key: string]: string }

type Action =
  | { type: 'OPEN_POPUP' }
  | { type: 'CLOSE_POPUP' }
  | { type: 'UPDATE_DATA'; payload: Data }
type State = { isOpen: boolean; data: Data }
type Dispatch = (action: Action) => void

const PopupContext = React.createContext<[State, Dispatch] | undefined>(
  undefined
)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_POPUP': {
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    }
    case 'CLOSE_POPUP': {
      return {
        ...state,
        isOpen: false,
      }
    }
    case 'UPDATE_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return {
        isOpen: false,
        data: {},
      }
    }
  }
}

const PopupProvider = (
  props: JSX.IntrinsicAttributes & React.ProviderProps<State | undefined>
): JSX.Element => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    isOpen: false,
    data: {},
  })

  const value: [State, Dispatch] = React.useMemo(() => [state, dispatch], [
    state,
  ])

  return <PopupContext.Provider {...props} value={value} />
}

interface UsePopup {
  openPopup: () => void
  closePopup: () => void
  updatePopupData: (payload: Data) => void
  dispatch: Dispatch
  state: State
}

const usePopup = (): UsePopup => {
  const context = React.useContext(PopupContext)
  if (context === undefined) {
    throw new Error('usePopup must be used within a CountProvider')
  }
  const [state, dispatch] = context
  const openPopup = () => dispatch({ type: 'OPEN_POPUP' })
  const closePopup = () => dispatch({ type: 'CLOSE_POPUP' })
  const updatePopupData = (payload: Data) =>
    dispatch({ type: 'UPDATE_DATA', payload })

  return {
    openPopup,
    closePopup,
    updatePopupData,
    dispatch,
    state,
  }
}

export { PopupProvider, usePopup }
