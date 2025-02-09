import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'

interface ProgressBarProps {
  progress: number
}

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}))

const Container = styled.div(() => ({
  width: '100%',
  height: 10,
  backgroundColor: colors.grey100,
  overflow: 'hidden',
  borderRadius: 6,
}))

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Container>
      <BaseProgressBar progress={progress} />
    </Container>
  )
}

export default ProgressBar
