import 'normalize.css'
import 'src/styles/global.scss'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'src/components/context/AuthContext'
import { ListsProvider } from 'src/components/context/ListsContext'
import { ClientProvider } from 'src/components/context/ClientContext'
import { UsersProvider } from 'src/components/context/UsersContext'
import 'ts-replace-all'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ClientProvider>
              <ListsProvider>
                <UsersProvider>
                  <Component {...pageProps} />
                </UsersProvider>
              </ListsProvider>
            </ClientProvider>
          </AuthProvider>
        </QueryClientProvider>
      )}
    </div>
  )
}

export default App
