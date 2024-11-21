import { CronJob } from 'cron'
import attendanceModel from '~/models/attendanceModel'

const job = new CronJob(
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

job.start()
;(async () => {
  console.log('Manually triggering the job now: ', new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))
  try {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    await attendanceModel.createAttendanceForMonth(month, year)

    console.log('Attendance for the month created successfully!')
  } catch (error) {
    console.error('Error creating attendance for the month:', error)
  }
})()
