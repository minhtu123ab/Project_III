import { Request, Response } from 'express'
import userService from '~/services/userService'

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { username, password, name, role, base_salary, phone, national_id } = req.body

      const newUser = await userService.createUser({
        username,
        password,
        name,
        role,
        base_salary,
        phone,
        national_id
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
      res.status(200).json({ status: 'success', message: 'Logged in successfully', data: { token } })
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
      const users = await userService.getAllUsers()
      res.status(200).json({ status: 'success', data: users })
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
      const { name, phone, national_id, address } = req.body
      const updatedUser = await userService.updateUser(id, { name, phone, national_id, address })
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
      const { name, phone, national_id, address, role, base_salary, status } = req.body
      const updatedUser = await userService.adminUpdateUser(id, {
        name,
        phone,
        national_id,
        address,
        role,
        base_salary,
        status
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
  }
}

export default userController
