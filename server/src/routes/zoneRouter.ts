import express from 'express'
import zoneController from '~/controllers/zoneController'
import { verifyAdmin, verifyToken } from '~/middlewares/verifyMiddleware'

const zoneRouter = express.Router()

zoneRouter.use(verifyToken)

zoneRouter.use(verifyAdmin)

zoneRouter.post('', zoneController.selectZones)

zoneRouter.get('', zoneController.getZones)

zoneRouter.delete('/:id', zoneController.deleteZones)

export default zoneRouter
