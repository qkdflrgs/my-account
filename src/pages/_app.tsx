import globalStyles from '@styles/globalStyles'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Layout from '@shared/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient({})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  )
}
