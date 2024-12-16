import { NextFunction, Request, Response } from 'express'

const payrollMiddleware = {
  getAllPayrollByMonth: async (req: Request, res: Response, next: NextFunction) => {
    const { month, year } = req.query
    if (!month || !year) {
      res.status(400).json({ message: 'Month and year are required' })
      return
    }
    next()
  },
  responsePayroll: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { status } = req.body
    if (!id || !status) {
      res.status(400).json({ message: 'ID and status are required' })
      return
    }
    next()
  }
}

export default payrollMiddleware
