import Skeleton from '@shared/Skeleton'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
  ssr: false,
})

export default function Home() {
  return (
    <>
      <EventBanners />
    </>
  )
}
