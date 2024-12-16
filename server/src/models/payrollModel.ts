import mongoose, { Document, Model } from 'mongoose'
import userModel from './userModel'
import attendanceService from '~/services/attendanceService'

interface IPayrollModel extends Document {
  user_id: mongoose.Types.ObjectId
  month: number
  year: number
  salary: number
  total_hours: number
  total_leaves: number
  total_late: number
  total_absent: number
  total_under_hours: number
  total_present: number
  total_holidays: number
  total_business_trip: number
  total_salary: number
  status: 'Pending' | 'Completed' | 'Rejected'
}

interface IPayrollModelStatic extends Model<IPayrollModel> {
  createPayrollForMonth(month: number, year: number): Promise<void>
}

const payrollSchema = new mongoose.Schema<IPayrollModel>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    salary: { type: Number, required: true },
    total_hours: { type: Number, required: true },
    total_leaves: { type: Number, required: true },
    total_late: { type: Number, required: true },
    total_absent: { type: Number, required: true },
    total_under_hours: { type: Number, required: true },
    total_present: { type: Number, required: true },
    total_holidays: { type: Number, required: true },
    total_business_trip: { type: Number, required: true },
    total_salary: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
  },
  {
    timestamps: true
  }
)

payrollSchema.statics.createPayrollForMonth = async function (month: number, year: number) {
  const users = await userModel.find({ status: { $ne: 'Resigned' } })
  for (const user of users) {
    const existingPayroll = await this.findOne({ user_id: user._id, month: month, year: year })
    if (!existingPayroll) {
      const userAttendances = await attendanceService.getAttendanceByMonth(user._id.toString(), month, year)
      const total_hours = userAttendances.reduce(
        (acc, attendance) => acc + parseFloat(attendance.working_hours || '0'),
        0
      )
      const total_leaves = userAttendances.filter((item) => item.status === 'On Leave').length
      const total_absent = userAttendances.filter((item) => item.status === 'Absent').length
      const total_under_hours = userAttendances.filter((item) => item.status === 'Under Hours').length
      const total_present = userAttendances.filter((item) => item.status === 'Present').length
      const total_holidays = userAttendances.filter((item) => item.status === 'Holiday').length
      const total_business_trip = userAttendances.filter((item) => item.status === 'On A Business Trip').length
      const total_late = userAttendances.filter((item) => item.status === 'Late').length
      const total_salary =
        user.base_salary * total_hours -
        100000 * total_absent -
        total_late * 50000 -
        total_under_hours * 50000 +
        total_holidays * 8 * user.base_salary +
        total_business_trip * 8 * user.base_salary +
        (total_leaves <= 1
          ? total_leaves * 8 * user.base_salary
          : total_leaves * (8 + (total_leaves - 1) * 4) * user.base_salary) +
        total_present * 50000

      const payroll = new this({
        user_id: user._id,
        month,
        year,
        salary: user.base_salary,
        total_hours: total_hours,
        total_leaves: total_leaves,
        total_late: total_late,
        total_absent: total_absent,
        total_under_hours: total_under_hours,
        total_present: total_present,
        total_holidays: total_holidays,
        total_business_trip: total_business_trip,
        total_salary: total_salary >= 0 ? total_salary : 0
      })
      await payroll.save()
    }
  }
}

const payrollModel = mongoose.model<IPayrollModel, IPayrollModelStatic>('Payrolls', payrollSchema)

export default payrollModel
