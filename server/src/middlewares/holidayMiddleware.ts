import { NextFunction, Request, Response } from 'express'

const holidayMiddleware = {
  createHoliday: async (req: Request, res: Response, next: NextFunction) => {
    const { name, date } = req.body
    if (!date || !name) {
      res.status(400).json({ message: 'Name or date are required' })
      return
    }
    next()
  },
  updateHoliday: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ message: 'ID is required' })
      return
    }
    const { date, name } = req.body
    if (!date && !name) {
      res.status(400).json({ message: 'Date or name is required' })
      return
    }
    next()
  },
  deleteHoliday: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ message: 'ID is required' })
      return
    }
    next()
  },
  getHoliday: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    if (!id) {
      res.status(400).json({ message: 'ID is required' })
      return
    }
    next()
  },
  getHolidaysByYear: async (req: Request, res: Response, next: NextFunction) => {
    const { year } = req.params
    if (!year) {
      res.status(400).json({ message: 'Year is required' })
      return
    }
    next()
  }
}

export default holidayMiddleware
