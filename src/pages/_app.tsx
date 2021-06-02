import 'normalize.css'
import 'src/styles/global.scss'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ListsProvider } from 'src/components/context/ListsContext'
import { UsersProvider } from 'src/components/context/UsersContext'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'ts-replace-all'

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const queryClientRef = React.useRef(new QueryClient())

  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : (
        <QueryClientProvider client={queryClientRef.current}>
          <ListsProvider>
            <UsersProvider>
              <Component {...pageProps} />
            </UsersProvider>
          </ListsProvider>
        </QueryClientProvider>
      )}
    </div>
  )
}

export default App
