import * as React from 'react'

type Action =
  | { type: 'TOGGLE_EMAIL_POPUP' }
  | { type: 'TOGGLE_MULTI_EMAILS_POPUP' }
  | { type: 'TOGGLE_RECOMMENDATIONS_POPUP' }
  | { type: 'TOGGLE_ADD_CONTACT_POPUP' }
  | { type: 'UPDATE_POPUP_DATA'; payload: UserData }

type State = {
  emailModalIsOpen: boolean
  multiEmailsIsOpen: boolean
  recommendationsIsOpen: boolean
  addContactModalIsOpen: boolean
  data: UserData
}

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const PopupContext = React.createContext<ContextType | null>(null)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_EMAIL_POPUP': {
      return {
        ...state,
        emailModalIsOpen: !state.emailModalIsOpen,
      }
    }
    case 'TOGGLE_MULTI_EMAILS_POPUP': {
      return {
        ...state,
        multiEmailsIsOpen: !state.multiEmailsIsOpen,
      }
    }
    case 'TOGGLE_RECOMMENDATIONS_POPUP': {
      return {
        ...state,
        recommendationsIsOpen: !state.recommendationsIsOpen,
      }
    }
    case 'TOGGLE_ADD_CONTACT_POPUP': {
      return {
        ...state,
        addContactModalIsOpen: !state.addContactModalIsOpen,
      }
    }
    case 'UPDATE_POPUP_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return {
        emailModalIsOpen: false,
        multiEmailsIsOpen: false,
        recommendationsIsOpen: false,
        addContactModalIsOpen: false,
        data: {},
      }
    }
  }
}

const PopupProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    emailModalIsOpen: false,
    multiEmailsIsOpen: false,
    recommendationsIsOpen: false,
    addContactModalIsOpen: false,
    data: {},
  })

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}

const usePopup = (): ContextType => {
  const context = React.useContext(PopupContext)
  if (context === null) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}

export { PopupProvider, usePopup }
