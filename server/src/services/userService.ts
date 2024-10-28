import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '~/models/userModel'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET as string

const userService = {
  createUser: async ({ username, password, name, role, base_salary, phone, national_id }: ICreateUser) => {
    const salt = await bcrypt.genSalt(10)
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
      national_id,
      hire_date
    })

    return newUser
  },

  loginUser: async (username: string, password: string) => {
    const user = await userModel.findOne({ username })
    if (!user) throw new Error('User not found')

    const checkPassword = await bcrypt.hash(password, user.salt)
    if (checkPassword !== user.password) throw new Error('Invalid password')

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '1h' })

    return token
  },

  getAllUsers: async () => {
    const users = await userModel.find()
    return users
  },

  updateUser: async (id: string, data: IUpdateUser) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    user.name = data.name
    user.phone = data.phone
    user.national_id = data.national_id
    user.address = data.address
    await user.save()
    return user
  },

  adminUpdateUser: async (id: string, data: IAdminUpdateUser) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    user.name = data.name
    user.phone = data.phone
    user.national_id = data.national_id
    user.address = data.address
    user.role = data.role as 'Executive' | 'Manager' | 'Senior Specialist' | 'Specialist' | 'Intern'
    user.base_salary = data.base_salary
    user.status = data.status as 'Active' | 'Pending' | 'Resigned' | 'Leave'
    await user.save()
    return user
  },

  deleteUser: async (id: string) => {
    const user = await userModel.findById(id)
    if (!user) throw new Error('User not found')
    await userModel.findByIdAndDelete(id)
    return user
  }
}

export default userService
