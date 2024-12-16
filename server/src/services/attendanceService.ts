import attendanceModel from '~/models/attendanceModel'
import userModel from '~/models/userModel'

const attendanceService = {
  checkIn: async (user_id: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const attendance = await attendanceModel.findOne({ user_id, date: today })
    if (attendance?.check_out) {
      throw new Error('You have already checked out')
    }

    if (attendance) {
      attendance.check_in = new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      await attendance.save()
      return attendance
    } else {
      const newAttendance = await attendanceModel.create({
        user_id,
        date: today,
        status: 'Present',
        check_in: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      })
      return newAttendance
    }
  },

  checkOut: async (user_id: string) => {
    const today = new Date().setHours(0, 0, 0, 0)
    const attendance = await attendanceModel.findOne({ user_id, date: today })
    if (!attendance || !attendance?.check_in) {
      throw new Error('You have not checked in yet')
    }

    if (attendance) {
      attendance.check_out = new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      await attendance.save()
      return attendance
    }
    return attendance
  },

  getAttendance: async (user_id: string, date: string) => {
    const checkId = await userModel.findById(user_id)
    const attendance = await attendanceModel.findOne({ user_id, date })
    if (!checkId) throw new Error('User not found')
    if (!attendance) {
      const newAttendance = await attendanceModel.create({ user_id: user_id, date })
      return newAttendance
    }
    return attendance
  },

  getAttendanceByMonth: async (user_id: string, month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
    const lastDay = new Date(year, month, 0).setHours(23, 59, 59, 999)
    return attendanceModel.find({
      user_id,
      date: {
        $gte: firstDay,
        $lte: lastDay
      }
    })
  },

  getAttendanceByMonthLeaves: async (user_id: string, month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).setHours(0, 0, 0, 0)
    const lastDay = new Date(year, month, 0).setHours(23, 59, 59, 999)
    return attendanceModel.find({
      user_id,
      date: {
        $gte: firstDay,
        $lte: lastDay
      },
      status: { $in: ['On Leave', 'Absent'] }
    })
  },

  getAllAttendanceByDay: async (day: Date, limit: number, page: number, name?: string) => {
    const query: { date: Date } = { date: day }
    const startIndex = (page - 1) * limit

    const totalCount = await attendanceModel
      .find(query)
      .populate({
        path: 'user_id',
        match: name ? { name: { $regex: name, $options: 'i' } } : undefined
      })
      .then((results) => results.filter((item) => item.user_id !== null).length)

    const attendances = (
      await attendanceModel
        .find(query)
        .populate({
          path: 'user_id',
          select: 'name role',
          match: name ? { name: { $regex: name, $options: 'i' } } : undefined
        })
        .sort({ 'user_id.name': 'asc' })
        .then((results) => results.filter((item) => item.user_id !== null))
    ).slice(startIndex, startIndex + limit)

    return { attendances, totalCount }
  }
}

export default attendanceService
