import * as React from 'react'
import testLists from 'src/testLists.json'

type State = Lists | null
type ContextType = {
  state: State
}

const ListsContext = React.createContext<ContextType | null>(null)

const ListsProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(testLists)

  const value: ContextType = React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  )

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
}

const useLists = (): ContextType => {
  const context = React.useContext(ListsContext)
  if (context === null) {
    throw new Error('useLists must be used within a ListsProvider')
  }
  return context
}

export { ListsProvider, useLists }
