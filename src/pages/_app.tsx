import 'normalize.css'
import 'src/styles/global.scss'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
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
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ListsProvider>
          <UsersProvider>
            <Component {...pageProps} />
          </UsersProvider>
        </ListsProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
