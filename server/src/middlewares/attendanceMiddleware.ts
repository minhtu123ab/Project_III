import { NextFunction, Request, Response } from 'express'
import zoneModel from '~/models/zoneModel'
import haversineDistance from '~/utils/haversineDistance'

const attendanceMiddleware = {
  checkLocation: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { latitude, longitude, user_id } = req.body
    if (!latitude || !longitude) {
      res.status(400).json({ message: 'Both latitude and longitude are required' })
      return
    }
    if (!user_id) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }
    const location = await zoneModel.findOne()
    if (!location) {
      res.status(400).json({ message: 'No location found' })
      return
    }
    const distance = haversineDistance(location.latitude, location.longitude, latitude, longitude)
    if (distance > location.radius) {
      res.status(400).json({ message: 'You are not in the zone' })
      return
    }

    next()
  },
  checkUserId: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params
    const { date } = req.query
    if (!user_id || !date) {
      res.status(400).json({ message: 'User ID and date are required' })
      return
    }
    next()
  },
  getAttendanceByMonth: async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params
    const { month, year } = req.query
    if (!user_id || !month || !year) {
      res.status(400).json({ message: 'User ID, month, and year are required' })
      return
    }
    next()
  },
  getAllAttendanceByDay: async (req: Request, res: Response, next: NextFunction) => {
    const { day } = req.query
    if (!day) {
      res.status(400).json({ message: 'Date are required' })
      return
    }
    next()
  }
}

export default attendanceMiddleware
