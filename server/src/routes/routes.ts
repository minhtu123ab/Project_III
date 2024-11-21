import express from 'express'
import userRouter from './userRouter'
import zoneRouter from './zoneRouter'
import attendanceRouter from './attendanceRoutes'
import holidayRouter from './holidayRouter'
import requestRouter from './requestRouter'

const router = express.Router()

router.use('/user', userRouter)
router.use('/zone', zoneRouter)
router.use('/attendance', attendanceRouter)
router.use('/holiday', holidayRouter)
router.use('/request', requestRouter)

export default router
