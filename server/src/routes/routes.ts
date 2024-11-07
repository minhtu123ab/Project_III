import express from 'express'
import userRouter from './userRoutes'
import zoneRouter from './zoneRouter'

const router = express.Router()

router.use('/user', userRouter)
router.use('/zone', zoneRouter)

export default router
