import { MAX_SCORE_OF_CREDIT } from '@constants'
import { colors } from '@styles/colorPalette'
import { memo, useEffect, useRef, useState } from 'react'
import Text from './Text'
import addDelimiter from '@utils/addDelimiter'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface CreditScoreChartProps {
  width?: number
  height?: number
  score: number
}

function CreditScoreChart({
  width = 100,
  height = 100,
  score,
}: CreditScoreChartProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [totalLength, setTotalLength] = useState<number>(0)
  const dashoffset = totalLength - (score / MAX_SCORE_OF_CREDIT) * totalLength

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength())
    }
  }, [])

  return (
    <Container width={width} height={height}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 223 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M18.421 154C12.3741 140.971 9 126.458 9 111.159C9 54.7382 54.8908 9 111.5 9C168.109 9 214 54.7382 214 111.159C214 126.458 210.626 140.971 204.579 154"
          stroke={colors.grey100}
          strokeWidth="18"
          strokeLinecap="round"
        ></path>

        <path
          d="M18.421 154C12.3741 140.971 9 126.458 9 111.159C9 54.7382 54.8908 9 111.5 9C168.109 9 214 54.7382 214 111.159C214 126.458 210.626 140.971 204.579 154"
          stroke={colors.blue980}
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashoffset}
        ></path>
      </svg>
      <Text typography="t6" css={textStyles}>
        {score === 0 ? '???' : addDelimiter(score)}
      </Text>
    </Container>
  )
}

const Container = styled.div<{ width: number; height: number }>(
  ({ width, height }) => ({
    position: 'relative',
    width,
    height,
  }),
)

const textStyles = css`
  position: absolute;
  bottom: 25%;
  transform: translateX(-50%);
  left: 50%;
`

export default memo(CreditScoreChart)
