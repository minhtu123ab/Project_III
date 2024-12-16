import { Request, Response } from 'express'
import attendanceModel from '~/models/attendanceModel'
import holidayModel from '~/models/holidayModel'
import payrollModel from '~/models/payrollModel'
import requestModel from '~/models/requestModel'
import userModel from '~/models/userModel'

const dashboardController = {
  getDashboard: async (req: Request, res: Response) => {
    try {
      const totalEmployees = await userModel.countDocuments({
        status: { $nin: ['Resigned', 'Leave'] }
      })

      const month = new Date().getMonth() === 0 ? 12 : new Date().getMonth()
      const year = new Date().getFullYear()
      const payrolls = await payrollModel.find({
        month,
        year
      })
      let totalPayroll = 0
      for (const p of payrolls) {
        totalPayroll += p.total_salary
      }

      const today = new Date().setHours(0, 0, 0, 0)
      const absentAndBusiness = await attendanceModel.countDocuments({
        date: today,
        status: { $in: ['Absent', 'On A Business Trip'] }
      })
      const totalAttendances = await attendanceModel.countDocuments()
      const attendanceRate = (absentAndBusiness / totalAttendances) * 100

      const firstDay = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
      const lastDay = new Date(year, month, 0).setHours(23, 59, 59, 999)
      const recentApplications = await requestModel.countDocuments({
        date: { $gte: new Date(firstDay), $lte: new Date(lastDay) }
      })

      const firstDayHoliday = new Date(year, 0, 1).setHours(0, 0, 0, 0)
      const lastDayHoliday = new Date(year, 11, 31).setHours(23, 59, 59, 999)
      const holidaysUpcoming = await holidayModel.countDocuments({
        date: { $gte: new Date(firstDayHoliday), $lte: new Date(lastDayHoliday) }
      })

      res.status(200).json({ totalEmployees, totalPayroll, attendanceRate, recentApplications, holidaysUpcoming })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default dashboardController
