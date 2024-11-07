import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    image: { type: String },
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
    birth_date: { type: Date, default: null },
    isAdmin: { type: Boolean, required: true, default: false },
    gender: { type: String, enum: ['Female', 'Male', 'Other'], required: true },
    base_salary: { type: Number, required: true },
    phone: { type: String, required: true },
    hire_date: { type: Date, required: true },
    off_date: { type: Date, default: null },
    address: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Active', 'Pending', 'Resigned', 'Leave'],
      required: true,
      default: 'Pending'
    },
    forgot_password_code: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  if (!this.image) {
    if (this.gender === 'Female') {
      this.image = 'https://www.w3schools.com/howto/img_avatar2.png'
    } else if (this.gender === 'Male') {
      this.image = 'https://www.w3schools.com/howto/img_avatar.png'
    } else {
      this.image = 'https://www.w3schools.com/howto/img_avatar.png'
    }
  }
  next()
})

const userModel = mongoose.model('Users', userSchema)

export default userModel
