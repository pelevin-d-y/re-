import * as React from 'react'
import testTemplates from 'src/testTemplates.json'
import findTemplate from 'src/helpers/utils/find-template'

type Action =
  | { type: 'TOGGLE_COMPOSE_POPUP'; payload: UserData | null }
  | { type: 'TOGGLE_COMPOSE_MULTI_POPUP' }
  | { type: 'TOGGLE_ADD_CONTACT_POPUP' }
  | { type: 'TOGGLE_CREATE_LIST_POPUP' }
  | { type: 'TOGGLE_DELETE_LIST_POPUP' }
  | { type: 'TOGGLE_TEMPLATES_POPUP' }
  | { type: 'TOGGLE_PINNED_USERS_POPUP' }
  | { type: 'UPDATE_POPUP_DATA'; payload: UserData | null }
  | { type: 'UPDATE_COMPOSE_MULTI_DATA'; payload: UserData[] | null }

type State = {
  emailModalIsOpen: boolean
  multiEmailsIsOpen: boolean
  addContactModalIsOpen: boolean
  createListModalIsOpen: boolean
  deleteListModalIsOpen: boolean
  modalPinnedIsOpen: boolean
  data: UserData | null
  dataMulti: UserData[] | null
}

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const PopupContext = React.createContext<ContextType | null>(null)

const initialState = {
  emailModalIsOpen: false,
  multiEmailsIsOpen: false,
  addContactModalIsOpen: false,
  createListModalIsOpen: false,
  deleteListModalIsOpen: false,
  modalPinnedIsOpen: false,
  data: null,
  dataMulti: null,
}

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_COMPOSE_POPUP': {
      if (action.payload) {
        const templateData = findTemplate(
          testTemplates,
          action.payload?.template
        )
        console.log('!state.emailModalIsOpen', !state.emailModalIsOpen)
        return {
          ...state,
          data: { ...action.payload, templateData },
          emailModalIsOpen: !state.emailModalIsOpen,
        }
      }
      return {
        ...state,
        emailModalIsOpen: !state.emailModalIsOpen,
      }
    }
    case 'TOGGLE_COMPOSE_MULTI_POPUP': {
      if (state?.dataMulti && state?.dataMulti?.length > 0) {
        return {
          ...state,
          multiEmailsIsOpen: !state.multiEmailsIsOpen,
        }
      }
      return state
    }
    case 'TOGGLE_ADD_CONTACT_POPUP': {
      return {
        ...state,
        addContactModalIsOpen: !state.addContactModalIsOpen,
      }
    }
    case 'TOGGLE_CREATE_LIST_POPUP': {
      return {
        ...state,
        createListModalIsOpen: !state.createListModalIsOpen,
      }
    }
    case 'TOGGLE_PINNED_USERS_POPUP': {
      return {
        ...state,
        modalPinnedIsOpen: !state.modalPinnedIsOpen,
      }
    }
    case 'TOGGLE_DELETE_LIST_POPUP': {
      return {
        ...state,
        deleteListModalIsOpen: !state.deleteListModalIsOpen,
      }
    }
    case 'UPDATE_POPUP_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }

    case 'UPDATE_COMPOSE_MULTI_DATA': {
      return {
        ...state,
        dataMulti: action.payload,
      }
    }

    default: {
      return initialState
    }
  }
}

const PopupProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(popupReducer, initialState)

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
