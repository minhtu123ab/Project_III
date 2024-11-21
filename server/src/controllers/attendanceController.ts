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
        const attendances = await attendanceService.getAllAttendanceByDay(date)
        res.status(200).json({ attendances })
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
