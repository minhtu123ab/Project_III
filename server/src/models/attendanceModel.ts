import mongoose, { Document, Model } from 'mongoose'
import userModel from './userModel'
import holidayModel from './holidayModel'

interface IAttendanceModel extends Document {
  user_id: mongoose.Types.ObjectId
  date: Date
  status: 'Present' | 'Absent' | 'Late' | 'On Leave' | 'Holiday' | 'Under Hours' | 'Weekend'
  check_in?: string
  check_out?: string
  working_hours?: string
  holiday_id?: mongoose.Types.ObjectId
}

interface IAttendanceModelStatic extends Model<IAttendanceModel> {
  createAttendanceForMonth(month: number, year: number): Promise<void>
}

const attendanceSchema = new mongoose.Schema<IAttendanceModel>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Present', 'Absent', 'Late', 'On Leave', 'Holiday', 'Under Hours', 'Weekend'],
      default: 'Absent'
    },
    check_in: { type: String },
    check_out: { type: String },
    working_hours: { type: String },
    holiday_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Holidays' }
  },
  {
    timestamps: true
  }
)

attendanceSchema.pre('save', function (next) {
  if (this.status === 'On Leave' || this.status === 'Holiday' || this.status === 'Weekend') {
    return next()
  }
  if (this.check_in && this.check_out) {
    const checkInTime = new Date('1970-01-01T' + this.check_in + 'Z')
    const checkOutTime = new Date('1970-01-01T' + this.check_out + 'Z')

    const diffInMilliseconds = checkOutTime.getTime() - checkInTime.getTime()
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60)

    this.working_hours = diffInHours.toFixed(2)

    const lateTime = new Date('1970-01-01T08:00:00Z')
    if (checkInTime > lateTime) {
      this.status = 'Late'
    } else if (parseFloat(this.working_hours) >= 8) {
      this.status = 'Present'
    } else if (parseFloat(this.working_hours) > 0 && parseFloat(this.working_hours) < 8) {
      this.status = 'Under Hours'
    }
  }
  next()
})

attendanceSchema.statics.createAttendanceForMonth = async function (month: number, year: number) {
  const users = await userModel.find({ status: { $ne: 'Resigned' } })

  const firstDayOfMonth = new Date(year, month - 1, 1)
  const lastDayOfMonth = new Date(year, month, 0)

  for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    const today = new Date(day.setHours(0, 0, 0, 0))
    const vietnamTime = new Date(day.getTime() + 7 * 60 * 60 * 1000)

    const isWeekend = today.getDay() === 0 || today.getDay() === 6
    const dayHoliday = await holidayModel.findOne({ date: vietnamTime })

    for (const user of users) {
      const existingAttendance = await this.findOne({ user_id: user._id, date: today })

      if (!existingAttendance && !dayHoliday && !isWeekend) {
        await this.create({
          user_id: user._id,
          date: today,
          status: 'Absent'
        })
      } else if (!existingAttendance && dayHoliday) {
        await this.create({
          user_id: user._id,
          date: today,
          status: 'Holiday',
          holiday_id: dayHoliday ? dayHoliday._id : undefined
        })
      } else if (!existingAttendance && isWeekend) {
        await this.create({
          user_id: user._id,
          date: today,
          status: 'Weekend'
        })
      }
    }
  }
}

const attendanceModel = mongoose.model<IAttendanceModel, IAttendanceModelStatic>('Attendances', attendanceSchema)

export default attendanceModel
