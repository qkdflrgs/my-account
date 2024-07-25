import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import withAuth from '@shared/hocs/withAuth'
import { signOut } from 'next-auth/react'
import ListRow from '@shared/ListRow'
import { useRouter } from 'next/router'

function MyPage() {
  const navigate = useRouter()

  return (
    <div>
      <Spacing size={100} />
      <Flex justify="center">
        <Button
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          로그아웃
        </Button>
      </Flex>
      <Spacing
        size={8}
        backgroundColor="grey100"
        style={{ margin: '20px 0' }}
      />
      <ul>
        <ListRow
          contents={<ListRow.Texts title="약관" subTitle="약관목록 및 철회" />}
          withArrow={true}
          onClick={() => navigate.push('/settings/terms')}
        />
      </ul>
    </div>
  )
}

export default withAuth(MyPage)
