import express from 'express'
import attendanceController from '~/controllers/attendanceController'
import attendanceMiddleware from '~/middlewares/attendanceMiddleware'
import { verifyToken } from '~/middlewares/verifyMiddleware'

const attendanceRouter = express.Router()

attendanceRouter.use(verifyToken)

// attendanceRouter.post('/check-in', attendanceMiddleware.checkLocation, attendanceController.checkIn)
attendanceRouter.post('/check-in', attendanceController.checkIn)

// attendanceRouter.post('/check-out', attendanceMiddleware.checkLocation, attendanceController.checkOut)
attendanceRouter.post('/check-out', attendanceController.checkOut)

attendanceRouter.get('/day', attendanceMiddleware.getAllAttendanceByDay, attendanceController.getAllAttendanceByDay)

attendanceRouter.get(
  '/month/leaves/:user_id',
  attendanceMiddleware.getAttendanceByMonth,
  attendanceController.getAttendanceByMonthLeaves
)

attendanceRouter.get(
  '/month/:user_id',
  attendanceMiddleware.getAttendanceByMonth,
  attendanceController.getAttendanceByMonth
)

attendanceRouter.get('/:user_id', attendanceMiddleware.checkUserId, attendanceController.getAttendance)

export default attendanceRouter
