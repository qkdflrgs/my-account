import useUser from '@hooks/useUser'
import { getTerms } from '@remote/account'
import { User } from '@models/user'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { useMemo } from 'react'
import { TERM_LIST } from '@constants/account'
import Top from '@shared/Top'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'

export default function TermsPage() {
  const user = useUser()
  const { data } = useQuery({
    queryKey: ['terms', user?.id],
    queryFn: () => getTerms(user?.id as string),
    enabled: user != null,
  })

  const agreedTerms = useMemo(() => {
    if (data == null) {
      return null
    }

    // 유저가 동의한 약관 목록
    const allAgreedTerms = TERM_LIST.filter(({ id }) =>
      data.termIds.includes(id),
    )

    // 필수 약관
    const mandatoryTerms = allAgreedTerms.filter(
      ({ mandatory }) => mandatory === true,
    )

    // 선택 약관
    const nonMandatoryTerms = allAgreedTerms.filter(
      ({ mandatory }) => mandatory === false,
    )

    return { mandatoryTerms, nonMandatoryTerms }
  }, [data])

  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />
      {agreedTerms == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {agreedTerms.mandatoryTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}
          {agreedTerms.nonMandatoryTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={<Button>철회</Button>}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['terms', (session.user as User).id],
      queryFn: () => getTerms((session.user as User).id),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
