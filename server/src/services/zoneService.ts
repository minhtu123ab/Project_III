import zoneModel from '~/models/zoneModel'

const zoneService = {
  selectZones: async (latitude: number, longitude: number, radius: number) => {
    const zones = await zoneModel.findOne()
    if (zones) {
      zones.latitude = latitude
      zones.longitude = longitude
      zones.radius = radius
      await zones.save()
      return zones
    }
    const zonesCreate = await zoneModel.create({
      latitude,
      longitude,
      radius
    })
    return zonesCreate
  },

  getZones: async () => {
    const zones = await zoneModel.find()
    if (!zones) {
      throw new Error('No zones found')
    }
    return zones
  },

  deleteZone: async (zoneId: string) => {
    if (!zoneId) {
      throw new Error('Zone ID is required')
    }
    const zones = await zoneModel.findById(zoneId)
    if (!zones) {
      throw new Error('Zone not found')
    }
    await zoneModel.findByIdAndDelete(zoneId)
    return zones
  }
}

export default zoneService
