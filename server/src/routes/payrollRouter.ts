import express from 'express'
import payrollController from '~/controllers/payrollController'
import payrollMiddleware from '~/middlewares/payrollMiddleware'
import { verifyAdmin, verifyToken } from '~/middlewares/verifyMiddleware'

const payrollRouter = express.Router()

payrollRouter.use(verifyToken)

payrollRouter.get('', verifyAdmin, payrollMiddleware.getAllPayrollByMonth, payrollController.getAllPayrollByMonth)

payrollRouter.get('/all', verifyAdmin, payrollMiddleware.getAllPayrollByMonth, payrollController.getAllPayroll)

payrollRouter.put('/:id', verifyAdmin, payrollMiddleware.responsePayroll, payrollController.responsePayroll)

payrollRouter.get('/user', payrollMiddleware.getAllPayrollByMonth, payrollController.getPayrollByUserId)

export default payrollRouter
