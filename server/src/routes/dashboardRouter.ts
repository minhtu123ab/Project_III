import express from 'express'
import dashboardController from '~/controllers/dashboardController'
import { verifyAdmin } from '~/middlewares/verifyMiddleware'

const dashboardRouter = express.Router()

dashboardRouter.use(verifyAdmin)

dashboardRouter.get('', dashboardController.getDashboard)

export default dashboardRouter
