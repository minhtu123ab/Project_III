function getRandomTime(startTime: string, endTime: string): string {
  const start = new Date(`1970-01-01T${startTime}Z`).getTime()
  const end = new Date(`1970-01-01T${endTime}Z`).getTime()

  const randomTimestamp = Math.floor(Math.random() * (end - start + 1)) + start
  const randomDate = new Date(randomTimestamp)

  return randomDate.toISOString().slice(11, 19)
}

export default getRandomTime
