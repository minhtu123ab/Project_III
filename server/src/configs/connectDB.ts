import mongoose from 'mongoose'
import 'dotenv/config'

const DATABASE_NAME = process.env.DATABASE_NAME

const query = 'mongodb://localhost:27017/' + DATABASE_NAME

const connectDB = async () => {
  try {
    await mongoose.connect(query)
    console.log('Connected to database successfully!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
