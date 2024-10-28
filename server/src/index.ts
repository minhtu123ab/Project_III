import express, { Request, Response } from 'express'
import router from './routes/routes'
import 'dotenv/config'
import connectDB from './configs/connectDb'

const app = express()
app.use(express.json())
app.use(router)

connectDB()

const PORT = process.env.PORT
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
