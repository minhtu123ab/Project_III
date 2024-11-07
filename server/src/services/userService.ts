import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '~/models/userModel'
import 'dotenv/config'
import generator from 'password-generator'
import { sendMail, sendMailCodePassword } from '~/configs/sendEmail'

const JWT_SECRET = process.env.JWT_SECRET as string

const userService = {
  createUser: async ({ username, name, role, base_salary, phone, national_id, gender, isAdmin }: ICreateUser) => {
    const salt = await bcrypt.genSalt(10)
    const password = generator(12, false)
    const hashedPassword = await bcrypt.hash(password, salt)

    const hire_date = new Date()

    const newUser = await userModel.create({
      username,
      password: hashedPassword,
      salt,
      name,
      role,
      base_salary,
      phone,
      birth_date: null,
      off_date: null,
      address: '',
      national_id,
      hire_date,
      gender,
      isAdmin
    })

    sendMail(username, username, password, name)

    return newUser
  },

  loginUser: async (username: string, password: string) => {
    const user = await userModel.findOne({ username })
    if (!user) throw new Error('User not found')

    const checkPassword = await bcrypt.hash(password, user.salt)
    if (checkPassword !== user.password) throw new Error('Incorrect account information or password')

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role, isAdmin: user.isAdmin }, JWT_SECRET, {
      expiresIn: '1h'
    })

    return token
  },

  getForgotPasswordCode: async (username: string) => {
    const user = await userModel.findOne({ username: username })
    if (!user) throw new Error('User not found')
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString()
    user.forgot_password_code = randomCode
    sendMailCodePassword(username, randomCode)
    await user.save()
  },

  forgotPassword: async (username: string, code: string, password: string) => {
    const user = await userModel.findOne({ username: username, forgot_password_code: code })
    if (!user) throw new Error('Invalid code or user not found')
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
    user.salt = salt
    user.forgot_password_code = ''
    await user.save()
  },

  getAllUsers: async (limit: number, page: number, name?: string) => {
    const matchStage = name
      ? {
          $match: {
            name: { $regex: name, $options: 'i' }
          }
        }
      : { $match: {} }

    const startIndex = (page - 1) * limit

    const totalCount = await userModel.countDocuments(matchStage.$match)

    const users = await userModel
      .aggregate([
        matchStage,
        {
          $addFields: {
            statusOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ['$status', 'Active'] }, then: 1 },
                  { case: { $eq: ['$status', 'Resigned'] }, then: 2 },
                  { case: { $eq: ['$status', 'Pending'] }, then: 3 },
                  { case: { $eq: ['$status', 'Leave'] }, then: 4 }
                ],
                default: 5
              }
            }
          }
        },
        {
          $sort: {
            statusOrder: 1,
            name: 1
          }
        },
        {
          $project: {
            password: 0,
            salt: 0
          }
        }
      ])
      .skip(startIndex)
      .limit(limit)
    return { users, totalCount }
  },

  getUser: async (id: string) => {
    const user = await userModel.findById(id).select('-salt -password -forgot_password_code')
    if (!user) throw new Error('User not found')
    return user
  },

  updateUser: async (id: string, data: IUpdateUser & { gender: 'Female' | 'Male' | 'Other' }) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    user.name = data.name
    user.phone = data.phone
    user.national_id = data.national_id
    if (data.address) user.address = data.address
    user.gender = data.gender
    if (data.birth_date) user.birth_date = data.birth_date
    if (data.image) user.image = data.image
    await user.save()
    return user
  },

  adminUpdateUser: async (id: string, data: IAdminUpdateUser & { gender: 'Female' | 'Male' | 'Other' }) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    user.name = data.name
    user.phone = data.phone
    user.national_id = data.national_id
    user.role = data.role as 'Executive' | 'Manager' | 'Senior Specialist' | 'Specialist' | 'Intern'
    user.base_salary = data.base_salary
    user.status = data.status as 'Active' | 'Pending' | 'Resigned' | 'Leave'
    user.gender = data.gender
    if (data.address) user.address = data.address
    user.isAdmin = data.isAdmin
    if (data.birth_date) user.birth_date = data.birth_date
    if (data.image) user.image = data.image
    await user.save()
    return user
  },

  deleteUser: async (id: string) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    if (user.status === 'Active') throw new Error('User is active already can not delete')
    if (user.isAdmin) throw new Error('User is admin already can not delete')
    await userModel.findByIdAndDelete(id)
    return user
  },

  changePassword: async (id: string, oldPassword: string, newPassword: string) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    const checkPassword = await bcrypt.hash(oldPassword, user.salt)
    if (checkPassword !== user.password) throw new Error('Incorrect password')
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    user.salt = salt
    await user.save()
  }
}

export default userService
