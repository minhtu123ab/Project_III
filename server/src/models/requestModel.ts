import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    title: { type: String, enum: ['Attendance Change', 'Leave Request'], required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    check_in: { type: String },
    check_out: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
      required: true
    }
  },
  { timestamps: true }
)

const requestModel = mongoose.model('Requests', requestSchema)

export default requestModel
