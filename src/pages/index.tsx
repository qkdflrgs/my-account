import Spacing from '@shared/Spacing'
import Account from '@components/home/Account'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  loading: () => <BannerSkeleton />,
  ssr: false,
})

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  loading: () => <CreditScoreSkeleton />,
  ssr: false,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="grey100" />
      <CreditScore />
    </>
  )
}
