import { Request, Response } from 'express'
import attendanceService from '~/services/attendanceService'

const attendanceController = {
  checkIn: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.body
      const attendance = await attendanceService.checkIn(user_id)
      res.status(200).json({ message: 'Checked in successfully', attendance })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  checkOut: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.body
      const attendance = await attendanceService.checkOut(user_id)
      res.status(200).json({ message: 'Checked out successfully', attendance })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  getAttendance: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params
      const { date } = req.query
      const attendance = await attendanceService.getAttendance(user_id, date as string)
      res.status(200).json({ attendance })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getAttendanceByMonth: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params
      const { month, year } = req.query
      const attendances = await attendanceService.getAttendanceByMonth(
        user_id,
        parseInt(month as string),
        parseInt(year as string)
      )
      res.status(200).json({ attendances })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getAttendanceByMonthLeaves: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params
      const { month, year } = req.query
      const attendances = await attendanceService.getAttendanceByMonthLeaves(
        user_id,
        parseInt(month as string),
        parseInt(year as string)
      )
      res.status(200).json({ attendances })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getAllAttendanceByDay: async (req: Request, res: Response) => {
    try {
      const { day } = req.query
      if (typeof day === 'string' || typeof day === 'number') {
        const date = new Date(day)
        date.setHours(0, 0, 0, 0)
        const limit = parseInt(req.query.limit as string) || 5
        const page = parseInt(req.query.page as string) || 1
        const name = req.query.name as string
        const { attendances, totalCount } = await attendanceService.getAllAttendanceByDay(date, limit, page, name)
        res.status(200).json({ attendances, totalCount })
      } else {
        res.status(400).json({ message: 'Invalid date format' })
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default attendanceController
