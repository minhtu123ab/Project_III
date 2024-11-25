import { Request, Response } from 'express'
import holidayService from '~/services/holidayService'

const holidayController = {
  getHolidays: async (req: Request, res: Response) => {
    try {
      const { year } = req.query
      const holidays = await holidayService.getHolidays(parseInt(year as string))
      res.status(200).json({ holidays })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  createHoliday: async (req: Request, res: Response) => {
    try {
      const { name, date } = req.body
      const newHoliday = await holidayService.createHoliday(name, date)
      res.status(201).json({ message: 'Holiday created successfully', holiday: newHoliday })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  updateHoliday: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { name, date } = req.body
      const updatedHoliday = await holidayService.updateHoliday(name, id, date)
      res.status(200).json({ message: 'Holiday updated successfully', holiday: updatedHoliday })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  deleteHoliday: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deletedHoliday = await holidayService.deleteHoliday(id)
      res.status(200).json({ message: 'Holiday deleted successfully', holiday: deletedHoliday })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  getHoliday: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const holiday = await holidayService.getHoliday(id)
      res.status(200).json({ holiday })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  getHolidaysByYear: async (req: Request, res: Response) => {
    try {
      const { year } = req.params
      const holidays = await holidayService.getHolidaysByYear(parseInt(year))
      res.status(200).json({ holidays })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default holidayController
