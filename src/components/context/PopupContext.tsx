import * as React from 'react'
import ComposeModal from '../shared-ui/modals/ComposeModal'
import AddFirstAccountModal from '../shared-ui/modals/AddFirstAccountModal'
import AddNewAccountModal from '../shared-ui/modals/AddNewAccountModal'
import AccountAddedModal from '../shared-ui/modals/AccountAddedModal'
import WelcomeModal from '../shared-ui/modals/WelcomeModal'
import ComposeModalMulti from '../shared-ui/modals/ComposeModalMulti'
import ModalPinnedContacts from '../shared-ui/modals/ModalPinnedContacts'
import CreateListModal from '../shared-ui/modals/CreateListModal'
import DeleteListModal from '../shared-ui/modals/DeleteListModal'
import 'react-quill/dist/quill.snow.css'

interface UserWithTemplateData extends RecommendationUser {
  templateData?: Template
}

type Action =
  | {
      type: 'TOGGLE_COMPOSE_POPUP'
      payload: UserWithTemplateData | FormattedContact | null
    }
  | { type: 'TOGGLE_COMPOSE_MULTI_POPUP' }
  | { type: 'TOGGLE_ADD_CONTACT_POPUP' }
  | { type: 'TOGGLE_CREATE_LIST_POPUP' }
  | { type: 'TOGGLE_DELETE_LIST_POPUP' }
  | { type: 'TOGGLE_ADD_FIRST_ACCOUNT_POPUP' }
  | { type: 'TOGGLE_ADD_NEW_ACCOUNT_POPUP' }
  | { type: 'TOGGLE_ACCOUNT_ADDED_POPUP' }
  | { type: 'TOGGLE_WELCOME_POPUP' }
  | { type: 'TOGGLE_TEMPLATES_POPUP' }
  | { type: 'TOGGLE_PINNED_USERS_POPUP' }
  | {
      type: 'UPDATE_POPUP_DATA'
      payload: UserWithTemplateData | FormattedContact | null
    }
  | {
      type: 'UPDATE_COMPOSE_MULTI_DATA'
      payload:
        | UserWithTemplateData[]
        | FormattedContact[]
        | RecommendationUser[]
        | null
    }
  | { type: 'UPDATE_LIST_ID_DATA'; payload: string }

type State = {
  emailModalIsOpen: boolean
  multiEmailsIsOpen: boolean
  addContactModalIsOpen: boolean
  createListModalIsOpen: boolean
  deleteListModalIsOpen: boolean
  addFirstAccountModalIsOpen: boolean
  addNewAccountModalIsOpen: boolean
  accountAddedModalIsOpen: boolean
  welcomeModalIsOpen: boolean
  modalPinnedIsOpen: boolean
  data: UserWithTemplateData | FormattedContact | null
  dataMulti: UserWithTemplateData[] | FormattedContact[] | null
  listId: string | ''
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
  addFirstAccountModalIsOpen: false,
  addNewAccountModalIsOpen: false,
  accountAddedModalIsOpen: false,
  welcomeModalIsOpen: false,
  modalPinnedIsOpen: false,
  data: null,
  dataMulti: null,
  listId: '',
}

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_COMPOSE_POPUP': {
      if (action.payload) {
        return {
          ...state,
          data: { ...action.payload },
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
    case 'TOGGLE_ADD_FIRST_ACCOUNT_POPUP': {
      return {
        ...state,
        addFirstAccountModalIsOpen: !state.addFirstAccountModalIsOpen,
      }
    }
    case 'TOGGLE_ADD_NEW_ACCOUNT_POPUP': {
      return {
        ...state,
        addNewAccountModalIsOpen: !state.addNewAccountModalIsOpen,
      }
    }
    case 'TOGGLE_ACCOUNT_ADDED_POPUP': {
      return {
        ...state,
        accountAddedModalIsOpen: !state.accountAddedModalIsOpen,
      }
    }
    case 'TOGGLE_WELCOME_POPUP': {
      return {
        ...state,
        welcomeModalIsOpen: !state.welcomeModalIsOpen,
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

    case 'UPDATE_LIST_ID_DATA': {
      return {
        ...state,
        listId: action.payload,
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

  return (
    <PopupContext.Provider value={value}>
      {children}
      <ComposeModal />
      <ComposeModalMulti />
      <ModalPinnedContacts />
      <CreateListModal />
      <DeleteListModal />
      <AddFirstAccountModal />
      <AddNewAccountModal />
      <AccountAddedModal />
      <WelcomeModal />
    </PopupContext.Provider>
  )
}

const usePopup = (): ContextType => {
  const context = React.useContext(PopupContext)
  if (context === null) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}

export { PopupProvider, usePopup }
