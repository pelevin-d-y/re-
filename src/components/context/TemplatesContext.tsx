import * as React from 'react'
import { get } from 'src/api/requests'

type Templates = Template[]

type Action =
  | { type: 'UPDATE_MESSAGE_TEMPLATE_DATA'; payload: Templates }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
  | { type: 'UPDATE_DEFAULT_TEMPLATE_DATA'; payload: Template | null }

type State = {
  data: Templates
  isLoading: boolean
  defaultTemplate: Template | null
}
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  getTemplate: (data?: RecommendationUser | FormattedContact) => Template | null
}

const TemplatesContext = React.createContext<ContextType | null>(null)

interface FormattedContactWithTemplate extends FormattedContact {
  templateData?: Template
}

interface RecommendationUserWithTemplate extends RecommendationUser {
  templateData?: Template
}

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_MESSAGE_TEMPLATE_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_DEFAULT_TEMPLATE_DATA': {
      return {
        ...state,
        defaultTemplate: action.payload,
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
        defaultTemplate: null,
      }
    }
  }
}

const TemplatesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    data: [],
    isLoading: false,
    defaultTemplate: null,
  })
  // default template id - ce7d1ed3-8f8c-11ec-a1d1-fbccb0ce5e9b
  React.useEffect(() => {
    const fetchTemplates = async () => {
      try {
        updateIsLoading(true)
        const TemplatesResp = await get.getMessageTemplates()

        dispatch({
          type: 'UPDATE_MESSAGE_TEMPLATE_DATA',
          payload: TemplatesResp,
        })

        if (state.defaultTemplate === null) {
          const defaultTemplate =
            TemplatesResp.find(
              (item) => item.info.name === 'Always Reconnect'
            ) || null

          dispatch({
            type: 'UPDATE_DEFAULT_TEMPLATE_DATA',
            payload: defaultTemplate,
          })
        }

        updateIsLoading(false)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('templates err', err)
      }
    }
    fetchTemplates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateIsLoading = (value: boolean) => {
    dispatch({
      type: 'UPDATE_IS_LOADING',
      payload: value,
    })
  }

  const getTemplate = React.useCallback(
    (data?: FormattedContactWithTemplate | RecommendationUserWithTemplate) => {
      if (data?.templateData) {
        return data.templateData
      }

      if (data && 'message_template_id' in data) {
        return (
          state.data.find(
            (item) => item.message_template_id === data.message_template_id
          ) || state.defaultTemplate
        )
      }

      return state.defaultTemplate
    },
    [state.data, state.defaultTemplate]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      getTemplate,
    }),
    [getTemplate, state]
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
    throw new Error('useTemplates must be used within a TemplatesProvider')
  }
  return context
}

export { TemplatesProvider, useTemplates }
