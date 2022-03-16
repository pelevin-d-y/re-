import * as React from 'react'
import { get } from 'src/api/requests'

type Templates = Template[]

type Action =
  | { type: 'UPDATE_MESSAGE_TEMPLATE_DATA'; payload: Templates }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }

type State = { data: Templates; isLoading: boolean }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
}

const TemplatesContext = React.createContext<ContextType | null>(null)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_MESSAGE_TEMPLATE_DATA': {
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

const TemplatesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    data: [],
    isLoading: false,
  })

  React.useEffect(() => {
    const setTemplates = async () => {
      try {
        updateIsLoading(true)
        const TemplatesResp = await get.getMessageTemplates()

        dispatch({
          type: 'UPDATE_MESSAGE_TEMPLATE_DATA',
          payload: TemplatesResp,
        })
        updateIsLoading(false)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('templates err', err)
      }
    }
    setTemplates()
  }, [])

  const updateIsLoading = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_LOADING',
      payload: value,
    })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  )
}

const useTemplates = (): ContextType => {
  const context = React.useContext(TemplatesContext)
  if (context === null) {
    throw new Error('useTemplates must be used within a CountProvider')
  }
  return context
}

export { TemplatesProvider, useTemplates }
