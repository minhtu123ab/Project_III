import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import userService from '~/services/userService'

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { username, name, role, base_salary, phone, national_id, gender, isAdmin } = req.body

      const newUser = await userService.createUser({
        username,
        name,
        role,
        base_salary,
        phone,
        national_id,
        gender,
        isAdmin
      })

      res.status(201).json({
        message: 'User created successfully',
        user: newUser
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const token = await userService.loginUser(username, password)
      res.status(200).json({ status: 'success', message: 'Logged in successfully', token })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getForgotPasswordCode: async (req: Request, res: Response) => {
    try {
      const { username } = req.body
      await userService.getForgotPasswordCode(username)
      res.status(200).json({ status: 'success', message: 'Code sent to email' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { username, code, password } = req.body
      await userService.forgotPassword(username, code, password)
      res.status(200).json({ status: 'success', message: 'Password updated successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string
      const limit = parseInt(req.query.limit as string) || 5
      const page = parseInt(req.query.page as string) || 1
      const { users, totalCount } = await userService.getAllUsers(limit, page, name)
      res.status(200).json({ status: 'success', data: users, totalCount: totalCount })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await userService.getUser(id)
      res.status(200).json({ status: 'success', data: user })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name, phone, national_id, address, gender, birth_date } = req.body
      const image = req.file?.path || null

      const updatedUser = await userService.updateUser(id, {
        name,
        phone,
        national_id,
        address,
        image,
        gender,
        birth_date
      })
      res.status(200).json({ status: 'success', message: 'User updated successfully', data: updatedUser })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  adminUpdateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { isAdmin, name, phone, national_id, address, role, base_salary, status, gender, birth_date } = req.body
      const image = req.file?.path || null

      const updatedUser = await userService.adminUpdateUser(id, {
        name,
        phone,
        national_id,
        address,
        role,
        base_salary,
        status,
        image,
        gender,
        isAdmin,
        birth_date
      })
      res.status(200).json({ status: 'success', message: 'User updated successfully', data: updatedUser })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deletedUser = await userService.deleteUser(id)
      res.status(200).json({ status: 'success', message: 'User deleted successfully', data: deletedUser })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  changePassword: async (req: Request, res: Response) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1]
      if (!token) {
        res.status(401).json({ message: 'No token provided' })
        return
      }
      const JWT_SECRET = process.env.JWT_SECRET as string
      const decoded = jwt.verify(token, JWT_SECRET) as ITokenDecoded
      const id = decoded.id
      const { oldPassword, newPassword } = req.body
      await userService.changePassword(id, oldPassword, newPassword)
      res.status(200).json({ status: 'success', message: 'Password updated successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default userController
