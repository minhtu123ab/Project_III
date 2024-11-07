import mongoose from 'mongoose'

const zoneSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    radius: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const zoneModel = mongoose.model('Zones', zoneSchema)

export default zoneModel
