import { Request, Response } from 'express'
import payrollService from '~/services/payrollService'

interface CustomRequest extends Request {
  userId?: string
}

const payrollController = {
  getAllPayrollByMonth: async (req: Request, res: Response) => {
    try {
      const { month, year } = req.query
      const limit = parseInt(req.query.limit as string) || 5
      const page = parseInt(req.query.page as string) || 1
      const name = req.query.name as string
      const { payrolls, totalCount } = await payrollService.getAllPayrollByMonth(
        Number(month),
        Number(year),
        limit,
        page,
        name
      )
      res.status(200).json({ payrolls, totalCount })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  responsePayroll: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { status } = req.body
      const payroll = await payrollService.responsePayroll(id, status)
      res.status(200).json({ payroll })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  getPayrollByUserId: async (req: CustomRequest, res: Response) => {
    try {
      const { month, year } = req.query
      const user_id = req.userId
      if (!user_id) {
        res.status(400).json({ message: 'User ID is required' })
        return
      }
      const payroll = await payrollService.getPayrollByUserId(user_id, Number(month), Number(year))
      res.status(200).json({ payroll })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },
  getAllPayroll: async (req: Request, res: Response) => {
    try {
      const { month, year } = req.query
      const payrolls = await payrollService.getAllPayroll(Number(month), Number(year))
      res.status(200).json({ payrolls })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default payrollController
