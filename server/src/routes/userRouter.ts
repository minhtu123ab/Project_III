import express from 'express'
import upload from '~/configs/multer'
import userController from '~/controllers/userController'
import userMiddleware from '~/middlewares/userMiddleware'
import { verifyAdmin, verifyToken } from '~/middlewares/verifyMiddleware'

const userRouter = express.Router()

userRouter.post('/login', userMiddleware.loginUser, userController.loginUser)

userRouter.post('/forgot-password-code', userMiddleware.getForgotPasswordCode, userController.getForgotPasswordCode)

userRouter.post('/reset-password', userMiddleware.forgotPassword, userController.forgotPassword)

userRouter.use(verifyToken)

userRouter.post('/create', verifyAdmin, userMiddleware.createUser, userController.createUser)

userRouter.get('/all', verifyAdmin, userController.getAllUsers)

userRouter.put('/update/:id', upload.single('image'), userMiddleware.updateUser, userController.updateUser)

userRouter.put(
  '/admin/update/:id',
  verifyAdmin,
  upload.single('image'),
  userMiddleware.adminUpdateUser,
  userController.adminUpdateUser
)

userRouter.get('/:id', userController.getUser)

userRouter.delete('/delete/:id', verifyAdmin, userController.deleteUser)

userRouter.post('/change-password', userMiddleware.changePassword, userController.changePassword)

export default userRouter
