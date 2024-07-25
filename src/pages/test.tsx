import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import CardListAddButton from '@components/test/CardListAddButton'
import EventForm from '@components/test/EventForm'
import EventBannerAddButton from '@components/test/EventBannerAddButton'
import TransactionForm from '@components/test/TransactionForm'

export default function TestPage() {
  return (
    <Flex direction="column">
      <Text bold={true}>배너</Text>
      <EventBannerAddButton />
      <Spacing
        size={8}
        backgroundColor="grey100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>카드</Text>
      <CardListAddButton />
      <Spacing
        size={8}
        backgroundColor="grey100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>이벤트</Text>
      <EventForm />
      <Spacing
        size={8}
        backgroundColor="grey100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>입출금 테스트</Text>
      <TransactionForm />
    </Flex>
  )
}
