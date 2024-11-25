import { Request, Response } from 'express'
import requestService from '~/services/requestService'

interface CustomRequest extends Request {
  userId?: string
}

const requestController = {
  getRequestsAttendance: async (req: Request, res: Response) => {
    try {
      const { month, year } = req.query
      const requests = await requestService.getRequestsAttendance(parseInt(month as string), parseInt(year as string))
      res.status(200).json({ requests })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getRequestsLeave: async (req: Request, res: Response) => {
    try {
      const { month, year } = req.query
      const requests = await requestService.getRequestsLeave(parseInt(month as string), parseInt(year as string))
      res.status(200).json({ requests })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  createRequestLeave: async (req: CustomRequest, res: Response) => {
    try {
      const { date, description, title } = req.body
      const user_id = req.userId
      if (!user_id) {
        throw new Error('User ID is required')
      }
      const newRequest = await requestService.createRequestLeave(user_id, date, description, title)
      res.status(201).json({ message: 'Leave request created successfully', request: newRequest })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  createRequestAttendance: async (req: CustomRequest, res: Response) => {
    try {
      const { date, description, check_in, check_out } = req.body
      const user_id = req.userId
      if (!user_id) {
        throw new Error('User ID is required')
      }
      const newRequest = await requestService.createRequestAttendance(user_id, date, description, check_in, check_out)
      res.status(201).json({ message: 'Attendance change request created successfully', request: newRequest })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  responseRequest: async (req: Request, res: Response) => {
    try {
      const { status } = req.body
      const { id } = req.params
      await requestService.responseRequest(id, status)
      res.status(200).json({ message: 'Request response updated successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  deleteRequest: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await requestService.deleteRequest(id)
      res.status(200).json({ message: 'Request deleted successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  updateRequestLeave: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { date, description } = req.body
      await requestService.updateRequestLeave(id, date, description)
      res.status(200).json({ message: 'Leave request updated successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  updateRequestAttendance: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { date, description, check_in, check_out } = req.body
      await requestService.updateRequestAttendance(id, date, description, check_in, check_out)
      res.status(200).json({ message: 'Attendance change request updated successfully' })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  },

  getRequestByUserId: async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.userId
      const { month, year } = req.query
      if (!userId) {
        throw new Error('User ID is required')
      }
      const requests = await requestService.getRequestByUserId(
        userId,
        parseInt(month as string),
        parseInt(year as string)
      )
      res.status(200).json({ requests })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' })
      }
    }
  }
}

export default requestController
