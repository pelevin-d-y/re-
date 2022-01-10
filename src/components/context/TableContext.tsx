import * as React from 'react'

type State = FormattedContact[] | UserData[] | null
type ContextType = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

const TableContext = React.createContext<ContextType | null>(null)

const TableProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<State>(null)

  const value: ContextType = React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

const useTable = (): ContextType => {
  const context = React.useContext(TableContext)
  if (context === null) {
    throw new Error('useTable must be used within a TableProvider')
  }
  return context
}

export { TableProvider, useTable }
