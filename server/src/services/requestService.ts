import attendanceModel from '~/models/attendanceModel'
import requestModel from '~/models/requestModel'

const requestService = {
  getRequestsAttendance: async () => {
    const requests = await requestModel.aggregate([
      {
        $match: {
          title: 'Attendance Change'
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

  getRequestsLeave: async () => {
    const requests = await requestModel.aggregate([
      {
        $match: {
          title: 'Leave Request'
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

  createRequestLeave: async (user_id: string, date: Date, description: string) => {
    const newRequest = await requestModel.create({ user_id, title: 'Leave Request', date, description })
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
          if (request.check_in !== null) {
            attendance.check_in = request.check_in
          }
          if (request.check_out !== null) {
            attendance.check_out = request.check_out
          }
          await attendance.save()
        }
      } else {
        if (!attendance) {
          await attendanceModel.create({ user_id: request.user_id, date: request.date, status: 'On Leave' })
        } else {
          await attendanceModel.findOneAndUpdate(
            { user_id: request.user_id, date: request.date },
            { status: 'On Leave' }
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

  getRequestByUserId: async (userId: string) => {
    const requests = await requestModel.find({ user_id: userId }).sort({ updatedAt: -1, createdAt: -1 })
    return requests
  }
}

export default requestService
