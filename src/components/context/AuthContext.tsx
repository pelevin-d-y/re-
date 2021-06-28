import * as React from 'react'
import { setToken } from 'src/api'
import getTokensUrl from 'src/helpers/utils/get-tokens-url'

type Tokens = {
  idToken?: string
  accessToken?: string
  isLogin: boolean
}

type Action = { type: 'UPDATE_AUTH_DATA'; payload: Tokens }

type State = Tokens | null

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const LS_ID_TOKEN = 'strata_id_token'
const LS_ACCESS_TOKEN = 'strata_access_token'

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

const initialState = () => {
  const accessToken = localStorage.getItem(LS_ACCESS_TOKEN)
  setToken(accessToken)
  return accessToken
    ? {
        isLogin: true,
      }
    : {
        isLogin: false,
      }
}

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState())

  React.useEffect(() => {
    const tokens = getTokensUrl(window.location.hash.substr(1))
    if (tokens.access_token) {
      localStorage.setItem(LS_ACCESS_TOKEN, tokens.access_token)
      setToken(tokens.access_token)
    }
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = (): ContextType => {
  const context = React.useContext(AuthContext)
  if (context === null) {
    throw new Error('useUsers must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
