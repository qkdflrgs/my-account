import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { useMemo, memo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleBand, scaleLinear } from '@visx/scale'
import { MONTHLY_CHART_VERTICAL_MARGIN } from '@constants'
import { colors } from '@styles/colorPalette'
import { AxisBottom } from '@visx/axis'
import { format, parseISO } from 'date-fns'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import addDelimiter from '@utils/addDelimiter'

type ChartData = {
  date: string
  balance: number
}

interface MonthlyChartProps {
  chartData: ChartData[]
  width: number
  height: number
}

const getX = (d: ChartData) => d.date
const getY = (d: ChartData) => d.balance
const formatDate = (date: string) => format(parseISO(date), 'M월')
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
  padding: 10,
}
let tooltipTimeout: number

function MonthlyChart({ chartData, width, height }: MonthlyChartProps) {
  const xMax = width
  const yMax = height - MONTHLY_CHART_VERTICAL_MARGIN
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<ChartData>()

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  })

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: chartData.map(getX),
        padding: 0.4,
      }),
    [xMax, getX],
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...chartData.map(getY))],
      }),
    [yMax],
  )

  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <rect
          ref={containerRef}
          width={width}
          height={height}
          fill="url(#teal)"
          rx={14}
        />
        <Group top={MONTHLY_CHART_VERTICAL_MARGIN / 2}>
          {chartData.map((d) => {
            const date = getX(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(getY(d)) ?? 0)
            const barX = xScale(date)
            const barY = yMax - barHeight
            return (
              <Bar
                key={date}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={colors.blue}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip()
                  }, 300)
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout)

                  const eventSvgCoords = localPoint(event)
                  const left = barX ?? 0 + barWidth
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  })
                }}
              />
            )
          })}
        </Group>
        <AxisBottom
          top={yMax + 60}
          scale={xScale}
          tickFormat={formatDate}
          stroke={colors.blue}
          tickStroke={colors.blue}
          tickLabelProps={{
            fill: colors.blue,
            fontSize: 13,
            textAnchor: 'middle',
          }}
        />
      </svg>

      <div>
        {tooltipOpen && tooltipData && (
          <TooltipInPortal
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <div style={{ color: colors.blue, fontSize: 16, fontWeight: 800 }}>
              <strong>{formatDate(tooltipData.date)}</strong>
            </div>
            <div style={{ color: colors.white, marginTop: 10 }}>
              <span>{addDelimiter(tooltipData.balance)}원</span>
            </div>
          </TooltipInPortal>
        )}
      </div>
    </>
  )
}

interface ChartWrapperProps {
  height?: number
  chartData: ChartData[]
}

function ChartWrapper({ height = 200, chartData }: ChartWrapperProps) {
  return (
    <ParentSize>
      {({ width }) => (
        <MonthlyChart width={width} height={height} chartData={chartData} />
      )}
    </ParentSize>
  )
}

export default memo(ChartWrapper)
