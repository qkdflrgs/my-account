import { colors } from '@styles/colorPalette'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const opacity = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
`

const Skeleton = styled.div<{
  width: string | number
  height: string | number
}>(({ width, height }) => ({
  width,
  height,
  backgroundColor: colors.grey100,
  animation: `${opacity} 2s easy-in-out 0.5s infinite`,
}))

export default Skeleton
