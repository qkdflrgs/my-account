import globalStyles from '@styles/globalStyles'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Layout from '@shared/Layout'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@shared/Navbar'
import { AlertContextProvider } from '@contexts/AlertContext'
import ErrorBoundary from '@shared/ErrorBoundary'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
