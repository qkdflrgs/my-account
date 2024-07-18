function formatTime(ms: number) {
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  const days = Math.floor(ms / day)

  if (days < 0) {
    return ''
  }

  const leftHour = Math.floor((ms - days * day) / hour)
  const leftMinute = Math.floor((ms - days * day - leftHour * hour) / minute)
  const leftSecond = Math.floor(
    (ms - days * day - leftHour * hour - leftMinute * minute) / 1000,
  )

  const HH = `${leftHour}`.padStart(2, '0')
  const MM = `${leftMinute}`.padStart(2, '0')
  const SS = `${leftSecond}`.padStart(2, '0')

  return days > 0 ? `${days}일 ${HH}:${MM}:${SS}` : `${HH}:${MM}:${SS}`
}

export default formatTime
