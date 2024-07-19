import { css } from '@emotion/react'
import Button from './Button'
import Flex from './Flex'
import { colors } from '@styles/colorPalette'
import Link from 'next/link'
import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const showSignButton = ['/auth/signin'].includes(router.pathname) === false

  const renderButton = useCallback(() => {
    if (session != null)
      return (
        <Link href="/my">
          <Image
            src={
              session.user?.image ??
              'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png'
            }
            alt="사용자 프로필"
            width={40}
            height={40}
          />
        </Link>
      )

    if (showSignButton) {
      return (
        <Link href="/auth/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [session, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/" style={{ fontWeight: 'bold', fontSize: '18px' }}>
        <h1>My Account</h1>
      </Link>
      {renderButton()}
    </Flex>
  )
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey100};
`
