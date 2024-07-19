import { Event } from '@models/event'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ReactMarkDown from 'react-markdown'
import { css } from '@emotion/react'
import { typographyMap } from '@styles/typography'
import Button from '@shared/Button'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

export default function Preview({
  data,
  mode,
}: {
  data: Event
  mode: 'preview' | 'edit'
}) {
  const navigate = useRouter()

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ padding: '12px 24px' }}>
        <Text bold={true}>{data.title}</Text>
        <Text typography="t6">{data.subTitle}</Text>
      </Flex>

      <div css={markdownStyles}>
        <ReactMarkDown>{data.contents}</ReactMarkDown>
      </div>

      {mode === 'preview' ? (
        <FixedBottomButton
          label={data.buttonLabel}
          onClick={() => navigate.push(data.link)}
        />
      ) : (
        <Button>{data.buttonLabel}</Button>
      )}
    </Flex>
  )
}

const markdownStyles = css`
  padding: 24px;
  ${typographyMap.t6}

  h1 {
    ${typographyMap.t3}
    font-weight: bold;
    margin: 24px;
  }

  h2 {
    ${typographyMap.t4}
    font-weight: bold;
    margin: 18px;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0px;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`
