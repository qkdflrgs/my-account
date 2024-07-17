import { getEventBanners } from '@remote/banner'
import { useQuery } from 'react-query'

export default function useEventBanners() {
  return useQuery({
    queryKey: ['event-banners'],
    queryFn: () => getEventBanners({ hasAccount: false }),
    suspense: true,
  })
}
