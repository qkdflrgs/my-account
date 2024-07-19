import { useAlertContext } from '@contexts/AlertContext'
import Preview from '@components/event/Preview'
import { Event } from '@models/event'
import { getEvent } from '@remote/event'
import { isAfter, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'

interface EventPageProps {
  id: string
  initialEvent: Event
}

export default function EventPage({ id, initialEvent }: EventPageProps) {
  const { open } = useAlertContext()
  const { data } = useQuery({
    queryKey: ['event'],
    queryFn: () => getEvent(id),
    initialData: initialEvent,
    onSuccess: (event) => {
      const isEnd = isAfter(new Date(), parseISO(event.endDate))

      if (isEnd) {
        open({
          title: '해당 이벤트는 종료되었습니다',
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다!',
          onButtonClick: () => window.history.back(),
        })
      }
    },
  })

  if (data == null) return null

  return <Preview data={initialEvent} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const event = await getEvent(id as string)

  return {
    props: {
      id,
      initialEvent: event,
    },
  }
}
