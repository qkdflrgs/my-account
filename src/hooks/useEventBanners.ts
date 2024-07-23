import { getEventBanners } from '@remote/banner'
import { useQuery } from 'react-query'
import useAccount from './useAccount'

export default function useEventBanners() {
  const { data: account } = useAccount()

  return useQuery({
    queryKey: ['event-banners'],
    queryFn: () =>
      getEventBanners({
        hasAccount: account != null && account.status === 'DONE',
      }),
    suspense: true,
  })
}
