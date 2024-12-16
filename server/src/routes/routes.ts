import express from 'express'
import userRouter from './userRouter'
import zoneRouter from './zoneRouter'
import attendanceRouter from './attendanceRoutes'
import holidayRouter from './holidayRouter'
import requestRouter from './requestRouter'
import payrollRouter from './payrollRouter'
import dashboardRouter from './dashboardRouter'

const router = express.Router()

router.use('/user', userRouter)
router.use('/zone', zoneRouter)
router.use('/attendance', attendanceRouter)
router.use('/holiday', holidayRouter)
router.use('/request', requestRouter)
router.use('/payroll', payrollRouter)
router.use('/dashboard', dashboardRouter)

export default router
