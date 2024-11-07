import { CronJob } from 'cron'
import attendanceModel from '~/models/attendanceModel'

const job = new CronJob('0 0 * * *', async () => {
  try {
    await attendanceModel.createAttendanceForDay()
    console.log('Attendance for today created successfully!')
  } catch (error) {
    console.error('Error creating attendance for today:', error)
  }
})

job.start()
