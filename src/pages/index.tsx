import Account from '@components/home/Account'
import { BannerSkeleton } from '@components/home/EventBanners'
import Skeleton from '@shared/Skeleton'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  loading: () => <BannerSkeleton />,
  ssr: false,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
