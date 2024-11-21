import mongoose from 'mongoose'

const holidaySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

holidaySchema.virtual('isPast').get(function () {
  return this.date < new Date()
})

const holidayModel = mongoose.model('Holidays', holidaySchema)

export default holidayModel
