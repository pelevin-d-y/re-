import 'normalize.css'
import 'src/styles/global.scss'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const queryClientRef = React.useRef(new QueryClient())

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
