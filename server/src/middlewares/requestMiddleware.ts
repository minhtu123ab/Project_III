import { NextFunction, Request, Response } from 'express'
import requestModel from '~/models/requestModel'
import { ObjectId } from 'mongodb'

const getMonthAndYearFromDate = (date: string) => {
  const d = new Date(date)
  return { month: d.getMonth() + 1, year: d.getFullYear() }
}

interface CustomRequest extends Request {
  userId?: string
}

const requestMiddleware = {
  deleteRequest: async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params
    const deletedRequest = await requestModel.findOne({ _id: id })
    if (!deletedRequest?.user_id.equals(new ObjectId(req.userId))) {
      res.status(403).json({ message: 'You are not authorized to delete this request' })
      return
    }
    if (!id) {
      res.status(400).json({ message: 'ID is required' })
      return
    }
    if (!deletedRequest) {
      res.status(404).json({ message: 'Request not found' })
      return
    }
    if (deletedRequest.status === 'Approved') {
      res.status(400).json({ message: 'Cannot delete an approved request' })
      return
    }

    next()
  },

  createRequestLeave: async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { date, description, title } = req.body
    const user_id = req.userId

    if (!user_id || !date || !description || !title) {
      res.status(400).json({ message: 'User ID, title, date, and description are required' })
      return
    }

    if (title === 'Leave') {
      const { month, year } = getMonthAndYearFromDate(date)

      const startDate = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
      const endDate = new Date(year, month, 0).setHours(23, 59, 59, 999)

      if (isNaN(startDate) || isNaN(endDate)) {
        res.status(400).json({ message: 'Invalid date format' })
        return
      }

      const recordCount = await requestModel.countDocuments({
        user_id,
        date: {
          $gte: startDate,
          $lt: endDate
        },
        title: 'Leave Request'
      })

      if (recordCount >= 2) {
        res.status(400).json({ message: 'Cannot create more than 2 requests in the same month' })
        return
      }
    }

    next()
  },

  createRequestAttendance: async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { date, description, check_in, check_out } = req.body
    const user_id = req.userId
    if (!user_id || !date || !description || !check_in || !check_out) {
      res.status(400).json({ message: 'User ID, date, description, check-in, and check-out are required' })
      return
    }

    const { month, year } = getMonthAndYearFromDate(date)

    const startDate = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
    const endDate = new Date(year, month, 0).setHours(23, 59, 59, 999)

    if (isNaN(startDate) || isNaN(endDate)) {
      res.status(400).json({ message: 'Invalid date format' })
      return
    }

    const recordCount = await requestModel.countDocuments({
      user_id,
      date: {
        $gte: startDate,
        $lt: endDate
      },
      title: 'Attendance Change'
    })

    if (recordCount >= 3) {
      res.status(400).json({ message: 'Cannot create more than 3 requests in the same month' })
      return
    }

    next()
  },

  updateRequestLeave: async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { date, description } = req.body
    if (!id) {
      res.status(400).json({ message: 'ID is required' })
      return
    }
    if (!date && !description) {
      res.status(400).json({ message: 'Date or description is required' })
      return
    }

    const request = await requestModel.findById(id)

    if (req.userId !== request?.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this request' })
      return
    }

    if (request && request.status === 'Approved') {
      res.status(400).json({ message: 'Cannot update an approved request' })
      return
    }

    if (date) {
      const { month, year } = getMonthAndYearFromDate(date)
      const recordCount = await requestModel.countDocuments({
        user_id: request?.user_id,
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`)
        },
        _id: { $ne: id },
        title: 'Leave Request'
      })

      if (recordCount >= 2) {
        res.status(400).json({ message: 'Cannot update to have more than 2 requests in the same month' })
        return
      }
    }

    next()
  },

  updateRequestAttendance: async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { date, description, check_in, check_out } = req.body
    if (!id) {
      res.status(400).json({ message: 'ID is required' })
      return
    }
    if (!date && !description && !check_in && !check_out) {
      res.status(400).json({ message: 'Date, description, check-in, or check-out is required' })
      return
    }

    const request = await requestModel.findById(id)

    if (req.userId !== request?.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this request' })
      return
    }

    if (request && request.status === 'Approved') {
      res.status(400).json({ message: 'Cannot update an approved request' })
      return
    }

    if (date) {
      const { month, year } = getMonthAndYearFromDate(date)
      const recordCount = await requestModel.countDocuments({
        user_id: request?.user_id,
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`)
        },
        _id: { $ne: id },
        title: 'Attendance Change'
      })

      if (recordCount >= 2) {
        res.status(400).json({ message: 'Cannot update to have more than 2 requests in the same month' })
        return
      }
    }

    next()
  },

  responseRequest: async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body
    const { id } = req.params
    if (!id || !status) {
      res.status(400).json({ message: 'ID and status are required' })
      return
    }
    if (!['Approved', 'Rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' })
      return
    }

    next()
  },

  getRequestByUserId: async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }

    next()
  }
}

export default requestMiddleware
