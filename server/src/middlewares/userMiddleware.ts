import { NextFunction, Request, Response } from 'express'
import userModel from '~/models/userModel'

const userMiddleware = {
  createUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { isAdmin, username, name, role, base_salary, phone, national_id, gender } = req.body

    if (
      typeof isAdmin !== 'boolean' ||
      !username ||
      !name ||
      !role ||
      !base_salary ||
      !phone ||
      !national_id ||
      !gender
    ) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(username)) {
      res.status(400).json({ message: 'Invalid email format' })
      return
    }

    if (!username || !password) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    next()
  },

  getForgotPasswordCode: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(username)) {
      res.status(400).json({ message: 'Invalid email format' })
      return
    }

    if (!username) {
      res.status(400).json({ message: 'Username is required' })
      return
    }

    next()
  },

  forgotPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, code, password, passwordAgain } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(username)) {
      res.status(400).json({ message: 'Invalid email format' })
      return
    }

    if (!username || !code || !password || !passwordAgain) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    if (password !== passwordAgain) {
      res.status(400).json({ message: 'Passwords do not match' })
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
  },

  changePassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { oldPassword, newPassword, newPasswordAgain } = req.body

    if (!oldPassword || !newPassword || !newPasswordAgain) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    if (newPassword === oldPassword) {
      res.status(400).json({ message: 'New password must be different from the old password' })
    }

    if (newPassword !== newPasswordAgain) {
      res.status(400).json({ message: 'Passwords do not match' })
      return
    }

    next()
  }
}

export default userMiddleware
