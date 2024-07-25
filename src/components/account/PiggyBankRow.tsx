import Image from 'next/image'
import ListRow from '@shared/ListRow'
import { useRouter } from 'next/router'
import withSuspense from '@shared/hocs/withSuspense'
import useUser from '@hooks/useUser'
import { useQuery } from 'react-query'
import { getPiggybank } from '@/remote/piggybank'
import { differenceInDays } from 'date-fns'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import addDelimiter from '@/utils/addDelimiter'

function PiggyBankRow() {
  const navigate = useRouter()
  const user = useUser()

  const { data } = useQuery({
    queryKey: ['piggybank', user?.id],
    queryFn: () => getPiggybank(user?.id as string),
    suspense: true,
  })

  if (data == null) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-256.png"
                width={40}
                height={40}
                alt="piggy bank"
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금씩 저금하여 목표 금액을 모아보세요"
              />
            }
            withArrow={true}
            onClick={() => navigate.push('/account/piggybank/new')}
          />
        </ul>
      </div>
    )
  }

  const dday = differenceInDays(data.endDate, new Date())

  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-256.png"
              width={40}
              height={40}
              alt="piggy bank"
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold={true}>
                D-{dday}
              </Text>
              <Text>
                {addDelimiter(data.goalAmount - data.balance)}원 남았어요
              </Text>
            </Flex>
          }
          withArrow={true}
          onClick={() => navigate.push('/account/piggybank/new')}
        />
      </ul>
    </div>
  )
}

export default withSuspense(PiggyBankRow, {
  fallback: <div>로딩중...</div>,
})
