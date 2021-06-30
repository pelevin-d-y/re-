import * as React from 'react'
import testTemplates from 'src/testTemplates.json'

type Templates = Template[]
type Action = { type: 'UPDATE_PLAYLIST_DATA'; payload: Templates }
type State = { data: Templates }
type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
}

const TemplatesContext = React.createContext<ContextType | null>(null)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PLAYLIST_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return {
        data: [],
      }
    }
  }
}

const TemplatesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    data: testTemplates,
  })

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
