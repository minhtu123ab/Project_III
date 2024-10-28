import express from 'express'
import userController from '~/controllers/userController'
import userMiddleware from '~/middlewares/userMiddleware'
import { verifyAdmin, verifyToken } from '~/middlewares/verifyMiddleware'

const router = express.Router()

router.post('/user/create', userMiddleware.createUser, userController.createUser)

router.post('/user/login', userMiddleware.loginUser, userController.loginUser)

router.use(verifyToken)

router.get('/user/all', verifyAdmin, userController.getAllUsers)

router.put('/user/update/:id', userMiddleware.updateUser, userController.updateUser)

router.put('/user/admin/update/:id', verifyAdmin, userMiddleware.adminUpdateUser, userController.adminUpdateUser)

router.delete('/user/delete/:id', verifyAdmin, userController.deleteUser)

export default router
