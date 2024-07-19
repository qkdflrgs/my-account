import globalStyles from '@styles/globalStyles'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Layout from '@shared/Layout'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@shared/Navbar'

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
            <AuthGuard>
              <Navbar />
              <Component {...pageProps} />
            </AuthGuard>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
