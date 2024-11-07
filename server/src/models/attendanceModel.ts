import mongoose, { Document, Model, Schema } from 'mongoose'
import userModel from './userModel'

const attendanceSchema = new mongoose.Schema<IAttendanceModel>({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  date: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Late', 'On Leave', 'Holiday'],
    default: 'Absent'
  },
  check_in: { type: String },
  check_out: { type: String },
  working_hours: { type: String }
})

attendanceSchema.pre('save', function (next) {
  if (this.check_in && this.check_out) {
    const checkInTime = new Date('1970-01-01T' + this.check_in + 'Z')
    const checkOutTime = new Date('1970-01-01T' + this.check_out + 'Z')

    const diffInMilliseconds = checkOutTime.getTime() - checkInTime.getTime()
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60)

    this.working_hours = diffInHours.toFixed(2)
  }
  next()
})

attendanceSchema.statics.createAttendanceForDay = async function () {
  const users = await userModel.find({ status: { $ne: 'Resigned' } })
  const today = new Date().setHours(0, 0, 0, 0)

  for (const user of users) {
    const existingAttendance = await this.findOne({ user_id: user._id, date: today })

    if (!existingAttendance) {
      await this.create({
        user_id: user._id,
        date: today,
        status: 'Absent'
      })
    }
  }
}

const attendanceModel = mongoose.model<IAttendanceModel, IAttendanceModelStatic>('Attendances', attendanceSchema)

export default attendanceModel
