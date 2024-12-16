import express from 'express'
import requestController from '~/controllers/requestController'
import requestMiddleware from '~/middlewares/requestMiddleware'
import { verifyAdmin, verifyToken } from '~/middlewares/verifyMiddleware'

const requestRouter = express.Router()

requestRouter.use(verifyToken)

requestRouter.get('/attendance', verifyAdmin, requestController.getRequestsAttendance)

requestRouter.get('/leave', verifyAdmin, requestController.getRequestsLeave)

requestRouter.post('/attendance', requestMiddleware.createRequestAttendance, requestController.createRequestAttendance)

requestRouter.post('/leave', requestMiddleware.createRequestLeave, requestController.createRequestLeave)

requestRouter.delete('/delete/:id', requestMiddleware.deleteRequest, requestController.deleteRequest)

requestRouter.put(
  '/attendance/:id',
  requestMiddleware.updateRequestAttendance,
  requestController.updateRequestAttendance
)

requestRouter.put('/leave/:id', requestMiddleware.updateRequestLeave, requestController.updateRequestLeave)

requestRouter.put('/response/:id', verifyAdmin, requestMiddleware.responseRequest, requestController.responseRequest)

requestRouter.get('/user', requestMiddleware.getRequestByUserId, requestController.getRequestByUserId)

requestRouter.get(
  '/user-admin',
  verifyAdmin,
  requestMiddleware.getRequestByUserId,
  requestController.getRequestByUserIdAdmin
)

export default requestRouter
