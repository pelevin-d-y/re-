import * as React from 'react'

type Action =
  | { type: 'TOGGLE_EMAIL_POPUP' }
  | { type: 'CLOSE_TOGGLE_MULTI_EMAILS_POPUP' }
  | { type: 'UPDATE_DATA'; payload: UserData }

type State = {
  emailModalIsOpen: boolean
  multiEmailsIsOpen: boolean
  data: UserData
}
type Dispatch = (action: Action) => void

const PopupContext = React.createContext<[State, Dispatch] | undefined>(
  undefined
)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_EMAIL_POPUP': {
      return {
        ...state,
        emailModalIsOpen: !state.emailModalIsOpen,
      }
    }
    case 'CLOSE_TOGGLE_MULTI_EMAILS_POPUP': {
      return {
        ...state,
        multiEmailsIsOpen: !state.multiEmailsIsOpen,
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
        emailModalIsOpen: false,
        multiEmailsIsOpen: false,
        data: {},
      }
    }
  }
}

const PopupProvider = (
  props: JSX.IntrinsicAttributes & React.ProviderProps<State | undefined>
): JSX.Element => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    emailModalIsOpen: false,
    multiEmailsIsOpen: false,
    data: {},
  })

  const value: [State, Dispatch] = React.useMemo(() => [state, dispatch], [
    state,
  ])

  return <PopupContext.Provider {...props} value={value} />
}

interface UsePopup {
  toggleEmailPopup: () => void
  toggleMultiEmailsPopup: () => void
  updatePopupData: (payload: UserData) => void
  dispatch: Dispatch
  state: State
}

const usePopup = (): UsePopup => {
  const context = React.useContext(PopupContext)
  if (context === undefined) {
    throw new Error('usePopup must be used within a CountProvider')
  }
  const [state, dispatch] = context
  const toggleEmailPopup = () => dispatch({ type: 'TOGGLE_EMAIL_POPUP' })
  const toggleMultiEmailsPopup = () =>
    dispatch({ type: 'CLOSE_TOGGLE_MULTI_EMAILS_POPUP' })
  const updatePopupData = (payload: UserData) =>
    dispatch({ type: 'UPDATE_DATA', payload })

  return {
    toggleEmailPopup,
    toggleMultiEmailsPopup,
    updatePopupData,
    dispatch,
    state,
  }
}

export { PopupProvider, usePopup }
