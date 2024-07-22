import { useQuery } from 'react-query'
import useUser from './useUser'
import { getCredit } from '@remote/credit'

export default function useCredit() {
  const user = useUser()

  return useQuery({
    queryKey: ['credit', user?.id],
    queryFn: () => getCredit(user?.id as string),
    enabled: user != null,
  })
}
