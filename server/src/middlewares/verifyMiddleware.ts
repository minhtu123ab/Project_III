import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  jwt.verify(token, JWT_SECRET as string, (err) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' })
      return
    }

    next()
  })
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' })
      return
    }

    if ((decoded as ITokenDecoded)?.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admins only.' })
      return
    }

    next()
  })
}

export { verifyToken, verifyAdmin }
