import { CronJob } from 'cron'
import attendanceModel from '~/models/attendanceModel'
import payrollModel from '~/models/payrollModel'
import getLastDayOfMonth from '~/utils/getLastDayOfMonth'

const attendanceJob = new CronJob(
  '0 0 1 * *',
  async () => {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    try {
      await attendanceModel.createAttendanceForMonth(month, year)

      console.log('Attendance for the month created successfully!')
    } catch (error) {
      console.error('Error creating attendance for the month:', error)
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)

const payrollJob = new CronJob(
  '59 23 * * *',
  async () => {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const lastDay = getLastDayOfMonth(year, month)

    if (today.getDate() === lastDay) {
      try {
        await payrollModel.createPayrollForMonth(month, year)
        console.log('Payroll for the month created successfully!')
      } catch (error) {
        console.error('Error creating payroll for the month:', error)
      }
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
)

attendanceJob.start()
payrollJob.start()
// ;(async () => {
//   console.log('Manually triggering the job now: ', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))
//   try {
//     const today = new Date()
//     const month = today.getMonth() + 1
//     const year = today.getFullYear()
//     await attendanceModel.createAttendanceForMonth(month, year)

//     console.log('Attendance for the month created successfully!')
//   } catch (error) {
//     console.error('Error creating attendance for the month:', error)
//   }
// })()
// ;(async () => {
//   console.log('Manually triggering the job now: ', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))
//   try {
//     const today = new Date()
//     const month = today.getMonth() + 1
//     const year = today.getFullYear()
//     await payrollModel.createPayrollForMonth(month, year)

//     console.log('Payroll for the month created successfully!')
//   } catch (error) {
//     console.error('Error creating payroll for the month:', error)
//   }
// })()
