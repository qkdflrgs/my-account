import Badge from '@shared/Badge'
import ListRow from '@shared/ListRow'
import { getCards } from '@remote/card'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query'
import { useRouter } from 'next/router'
import Top from '@shared/Top'
import Input from '@shared/Input'

export default function CardListPage() {
  const navigate = useRouter()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => getCards(pageParam),
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return

    fetchNextPage()
  }, [hasNextPage, fetchNextPage, isFetching])

  if (data == null) return null

  const cards = data?.pages.map(({ items }) => items).flat()

  return (
    <div>
      <Top title="추천 카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input onFocus={() => navigate.push('/card/search')} />
      </div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow={true}
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps() {
  const client = new QueryClient()

  await client.fetchInfiniteQuery(['cards'], () => getCards())

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}
