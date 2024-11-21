import express from 'express'
import holidayController from '~/controllers/holidayController'
import holidayMiddleware from '~/middlewares/holidayMiddleware'
import { verifyAdmin, verifyToken } from '~/middlewares/verifyMiddleware'

const holidayRouter = express.Router()

holidayRouter.use(verifyToken)

holidayRouter.get('', holidayController.getHolidays)

holidayRouter.post('', verifyAdmin, holidayMiddleware.createHoliday, holidayController.createHoliday)

holidayRouter.put('/:id', verifyAdmin, holidayMiddleware.updateHoliday, holidayController.updateHoliday)

holidayRouter.delete('/delete/:id', verifyAdmin, holidayMiddleware.deleteHoliday, holidayController.deleteHoliday)

holidayRouter.get('/:id', holidayMiddleware.getHoliday, holidayController.getHoliday)

holidayRouter.get('/year/:year', holidayMiddleware.getHolidaysByYear, holidayController.getHolidaysByYear)

export default holidayRouter
