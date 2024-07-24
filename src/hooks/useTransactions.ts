import { useInfiniteQuery } from 'react-query'
import useUser from './useUser'
import { getTransactions } from '@/remote/transaction'

export default function useTransactions({
  suspense,
}: { suspense?: boolean } = {}) {
  const user = useUser()
  return useInfiniteQuery({
    queryKey: ['transactions', user?.id],
    queryFn: ({ pageParam }) =>
      getTransactions({ pageParam, userId: user?.id as string }),
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    suspense,
  })
}
