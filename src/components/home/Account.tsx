// 작업중

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Image from 'next/image'
import styled from '@emotion/styled'

export default function Account() {
  const hasAccount = false

  // 계좌를 보유중 일 때
  if (hasAccount) {
    return (
      <Container>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="grey600">
              올라프 회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold={true}>
              7,000,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </Container>
    )
  }

  const accountStatus = 'READY'
  const title =
    accountStatus === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요'
      : '계좌 개설이\n더 쉽고 빨라졌어요'
  const buttonLabel =
    accountStatus === 'READY' ? '이어만들기' : '3분만에 개설하기'
  // 계죄를 보유하지 않거나 계설중 일 떄
  return (
    <Container>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Coin.png"
          alt=""
          width={80}
          height={80}
        />
      </Flex>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`
