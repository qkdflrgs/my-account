import Top from '@shared/Top'
import { Card } from '@models/card'
import { getCard } from '@remote/card'
import { GetServerSidePropsContext } from 'next'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'
import removeHtmlTags from '@utils/removeHtmlTags'
import { motion } from 'framer-motion'
import ListRow from '@shared/ListRow'
import Image from 'next/image'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCard: Card
}

export default function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id as string),
    initialData: initialCard,
  })

  if (data == null) return

  const subTitle =
    data.promotion != null
      ? removeHtmlTags(data.promotion.title)
      : data.tags.join(',')

  return (
    <div>
      <Top title={`${data.corpName} ${data.name}`} subTitle={subTitle} />
      <ul>
        {data.benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-256.png"
                  alt="카드 혜택"
                  width={40}
                  height={40}
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>
      {data.promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0px 24px 80px 24px' }}
        >
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(data.promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="1분만에 신청하고 혜택받기" onClick={() => {}} />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
    },
  }
}
