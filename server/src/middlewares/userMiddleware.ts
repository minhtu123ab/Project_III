import { NextFunction, Request, Response } from 'express'
import userModel from '~/models/userModel'

const userMiddleware = {
  createUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, name, role, base_salary, phone, national_id } = req.body

    if (!username || !password || !name || !role || !base_salary || !phone || !national_id) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(username)) {
      res.status(400).json({ message: 'Invalid email format' })
      return
    }

    const nationalIdRegex = /^\d{9}|\d{12}$/
    if (!nationalIdRegex.test(national_id)) {
      res.status(400).json({ message: 'Invalid national ID. Must be 9 or 12 digits.' })
      return
    }

    const phoneRegex = /^0\d{9}$|^0\d{10}$/
    if (!phoneRegex.test(phone)) {
      res.status(400).json({ message: 'Invalid phone number. Must start with 0 and be 10 or 11 digits.' })
      return
    }

    const user = await userModel.findOne({ username })
    if (user) {
      res.status(400).json({ message: 'Username already exists' })
      return
    }

    next()
  },

  loginUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    next()
  },

  adminUpdateUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, role, base_salary, phone, national_id, status } = req.body

    if (!name || !role || !base_salary || !phone || !national_id || !status) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    const nationalIdRegex = /^\d{9}|\d{12}$/
    if (!nationalIdRegex.test(national_id)) {
      res.status(400).json({ message: 'Invalid national ID. Must be 9 or 12 digits.' })
      return
    }

    const phoneRegex = /^0\d{9}$|^0\d{10}$/
    if (!phoneRegex.test(phone)) {
      res.status(400).json({ message: 'Invalid phone number. Must start with 0 and be 10 or 11 digits.' })
      return
    }

    next()
  },

  updateUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, phone, national_id } = req.body

    if (!name || !phone || !national_id) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    const nationalIdRegex = /^\d{9}|\d{12}$/
    if (!nationalIdRegex.test(national_id)) {
      res.status(400).json({ message: 'Invalid national ID. Must be 9 or 12 digits.' })
      return
    }

    const phoneRegex = /^0\d{9}$|^0\d{10}$/
    if (!phoneRegex.test(phone)) {
      res.status(400).json({ message: 'Invalid phone number. Must start with 0 and be 10 or 11 digits.' })
      return
    }

    next()
  }
}

export default userMiddleware
