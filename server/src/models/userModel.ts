import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  salt: { type: String, required: true },
  national_id: { type: String, required: true },
  role: {
    type: String,
    enum: ['Executive', 'Manager', 'Senior Specialist', 'Specialist', 'Intern'],
    required: true,
    default: 'Specialist'
  },
  base_salary: { type: Number, required: true },
  phone: { type: String, required: true },
  hire_date: { type: Date, required: true },
  off_date: { type: Date },
  address: { type: String },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Resigned', 'Leave'],
    required: true,
    default: 'Pending'
  }
})

const userModel = mongoose.model('Users', userSchema)

export default userModel
