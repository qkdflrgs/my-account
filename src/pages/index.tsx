import Spacing from '@shared/Spacing'
import Account from '@components/home/Account'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'
import dynamic from 'next/dynamic'
import { CardListSkeleton } from '@components/home/CardList'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { User } from '@/models/user'
import { getAccount } from '@/remote/account'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="grey100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="grey100" />
      <CardList />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['account', (session.user as User).id],
      queryFn: () => getAccount((session.user as User).id),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
