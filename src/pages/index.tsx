import Spacing from '@shared/Spacing'
import Account from '@components/home/Account'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'
import dynamic from 'next/dynamic'
import { CardListSkeleton } from '@components/home/CardList'

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
