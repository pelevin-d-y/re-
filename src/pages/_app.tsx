import 'normalize.css'
import 'src/styles/global.scss'
import React from 'react'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'src/components/context/AuthContext'
import { ClientProvider } from 'src/components/context/ClientContext'
import 'ts-replace-all'

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <div suppressHydrationWarning>
    {typeof window === 'undefined' ? null : (
      <AuthProvider>
        <ClientProvider>
          <Component {...pageProps} />
        </ClientProvider>
      </AuthProvider>
    )}
  </div>
)

export default App
