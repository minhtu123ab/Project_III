const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371 * 1000
  const toRadians = (angle: number): number => (Math.PI / 180) * angle

  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export default haversineDistance