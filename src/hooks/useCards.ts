import { getCards } from '@remote/card'
import { useQuery } from 'react-query'

export default function useCards() {
  return useQuery({
    queryKey: ['home-cards'],
    queryFn: () => getCards(),
    suspense: true,
  })
}
