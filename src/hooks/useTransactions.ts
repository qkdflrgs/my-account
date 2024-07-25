import { useInfiniteQuery } from 'react-query'
import useUser from './useUser'
import { getTransactions } from '@remote/transaction'
import { TransactionFilterType } from '@models/transaction'

export default function useTransactions({
  suspense,
  filter,
}: { suspense?: boolean; filter?: TransactionFilterType } = {}) {
  const user = useUser()
  return useInfiniteQuery({
    queryKey: ['transactions', user?.id, filter],
    queryFn: ({ pageParam }) =>
      getTransactions({ pageParam, userId: user?.id as string, filter }),
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    suspense,
  })
}
