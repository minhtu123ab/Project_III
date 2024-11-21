import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userModel from '~/models/userModel'

const JWT_SECRET = process.env.JWT_SECRET as string

interface CustomRequest extends Request {
  userId?: string
}

interface ITokenDecoded {
  id: string
  isAdmin?: boolean
  exp: number
}

const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as ITokenDecoded

    if (decodedToken.exp < Date.now() / 1000) {
      res.status(401).json({ message: 'Token has expired' })
      return
    }

    const user = await userModel.findById(decodedToken.id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    req.userId = decodedToken.id

    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token', error: err })
    return
  }
}

const verifyAdmin = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as ITokenDecoded

    if (!decodedToken?.isAdmin) {
      res.status(403).json({ message: 'Access denied. Admins only.' })
      return
    }

    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token', error: err })
    return
  }
}

export { verifyToken, verifyAdmin }
