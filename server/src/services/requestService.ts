import attendanceModel from '~/models/attendanceModel'
import requestModel from '~/models/requestModel'

const requestService = {
  getRequestsAttendance: async (month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
    const lastDay = new Date(year, month, 0).setHours(23, 59, 59, 999)

    const requests = await requestModel.aggregate([
      {
        $match: {
          title: 'Attendance Change',
          date: { $gte: new Date(firstDay), $lte: new Date(lastDay) }
        }
      },
      {
        $addFields: {
          sortPriority: {
            $cond: { if: { $eq: ['$status', 'Pending'] }, then: 0, else: 1 }
          }
        }
      },
      {
        $sort: {
          sortPriority: 1,
          updatedAt: -1,
          createdAt: -1
        }
      },
      {
        $project: {
          sortPriority: 0
        }
      }
    ])

    const populatedRequests = await requestModel.populate(requests, {
      path: 'user_id',
      select: 'name'
    })

    return populatedRequests
  },

  getRequestsLeave: async (month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
    const lastDay = new Date(year, month, 0).setHours(23, 59, 59, 999)
    const requests = await requestModel.aggregate([
      {
        $match: {
          title: { $in: ['Leave Request', 'Business Trip'] },
          date: { $gte: new Date(firstDay), $lte: new Date(lastDay) }
        }
      },
      {
        $addFields: {
          sortPriority: {
            $cond: { if: { $eq: ['$status', 'Pending'] }, then: 0, else: 1 }
          }
        }
      },
      {
        $sort: {
          sortPriority: 1,
          updatedAt: -1,
          createdAt: -1
        }
      },
      {
        $project: {
          sortPriority: 0
        }
      }
    ])
    const populatedRequests = await requestModel.populate(requests, {
      path: 'user_id',
      select: 'name'
    })
    return populatedRequests
  },

  createRequestLeave: async (user_id: string, date: Date, description: string, title: string) => {
    const titleRequest = title === 'Leave' ? 'Leave Request' : 'Business Trip'
    const newRequest = await requestModel.create({ user_id, title: titleRequest, date, description })
    return newRequest
  },

  createRequestAttendance: async (
    user_id: string,
    date: Date,
    description: string,
    check_in: string,
    check_out: string
  ) => {
    const newRequest = await requestModel.create({
      user_id,
      title: 'Attendance Change',
      date,
      description,
      check_in,
      check_out
    })
    return newRequest
  },

  responseRequest: async (id: string, status: string) => {
    const updatedRequest = await requestModel.findByIdAndUpdate(id, { status })
    if (status === 'Approved') {
      const request = await requestModel.findOne({ _id: id })
      if (!request) {
        throw new Error('Request not found')
      }

      const attendance = await attendanceModel.findOne({ user_id: request.user_id, date: request.date })

      if (request.title === 'Attendance Change') {
        if (!attendance) {
          const newAttendance = new attendanceModel({
            user_id: request.user_id,
            date: request.date,
            check_in: request.check_in,
            check_out: request.check_out
          })
          await newAttendance.save()
        } else {
          attendance.check_in = request.check_in!
          attendance.check_out = request.check_out!
          await attendance.save()
        }
      } else if (request.title === 'Leave Request') {
        if (!attendance) {
          await attendanceModel.create({ user_id: request.user_id, date: request.date, status: 'On Leave' })
        } else {
          await attendanceModel.findOneAndUpdate(
            { user_id: request.user_id, date: request.date },
            { status: 'On Leave' }
          )
        }
      } else if (request.title === 'Business Trip') {
        if (!attendance) {
          await attendanceModel.create({ user_id: request.user_id, date: request.date, status: 'On A Business Trip' })
        } else {
          await attendanceModel.findOneAndUpdate(
            { user_id: request.user_id, date: request.date },
            { status: 'On A Business Trip' }
          )
        }
      }
    }
    return updatedRequest
  },

  deleteRequest: async (id: string) => {
    const deletedRequest = await requestModel.findByIdAndDelete(id)
    return deletedRequest
  },

  updateRequestAttendance: async (id: string, date: Date, description: string, check_in: string, check_out: string) => {
    const updatedRequest = await requestModel.findByIdAndUpdate(id, { date, description, check_in, check_out })
    return updatedRequest
  },

  updateRequestLeave: async (id: string, date: Date, description: string) => {
    const updatedRequest = await requestModel.findByIdAndUpdate(id, { date, description })
    return updatedRequest
  },

  getRequestByUserId: async (userId: string, month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
    const lastDay = new Date(year, month, 0).setHours(23, 59, 59, 999)
    const requests = await requestModel
      .find({
        user_id: userId,
        createdAt: {
          $gte: firstDay,
          $lte: lastDay
        }
      })
      .sort({ updatedAt: -1, createdAt: -1 })
    return requests
  }
}

export default requestService
