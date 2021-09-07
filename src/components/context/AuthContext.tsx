import * as React from 'react'
import { setToken } from 'src/api'
import getTokensUrl from 'src/helpers/utils/get-tokens-url'
import { logInLink, LS_ID_TOKEN } from 'src/helpers/variables'

type Tokens = {
  isSignedIn?: boolean
  tokenChecked: boolean
}

type Action = { type: 'UPDATE_AUTH_DATA'; payload: Tokens }

type State = Tokens | null

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const AuthContext = React.createContext<ContextType | null>(null)

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_AUTH_DATA': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const getIdToken = () => {
  const urlTokens = getTokensUrl(window.location.hash.substr(1))
  if (urlTokens.id_token) {
    // window.history.replaceState(null, '', window.location.pathname)
    localStorage.setItem(LS_ID_TOKEN, urlTokens.id_token)
    return urlTokens.id_token
  }

  const lsIdToken = localStorage.getItem(LS_ID_TOKEN)
  if (lsIdToken) {
    return lsIdToken
  }

  return null
}

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isSignedIn: false,
    tokenChecked: false,
  })

  React.useEffect(() => {
    const token = getIdToken()
    if (token) {
      dispatch({
        type: 'UPDATE_AUTH_DATA',
        payload: { isSignedIn: true, tokenChecked: true },
      })
      setToken(token)
    } else {
      document.location.href = logInLink
    }
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return state?.tokenChecked ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : null
}

const useAuth = (): ContextType => {
  const context = React.useContext(AuthContext)
  if (context === null) {
    throw new Error('useUsers must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
