import holidayModel from '~/models/holidayModel'

const holidayService = {
  getHolidays: async (year: number) => {
    const firstDay = new Date(year, 0, 1).setHours(0, 0, 0, 0)
    const lastDay = new Date(year, 11, 31).setHours(23, 59, 59, 999)
    const holidays = await holidayModel
      .find({ date: { $gte: new Date(firstDay), $lte: new Date(lastDay) } })
      .sort({ date: -1 })
    return holidays
  },
  createHoliday: async (name: string, date: Date) => {
    const newHoliday = await holidayModel.create({ name, date })
    return newHoliday
  },
  updateHoliday: async (name: string, id: string, date: Date) => {
    const updatedHoliday = await holidayModel.findByIdAndUpdate(id, { name, date })
    return updatedHoliday
  },
  deleteHoliday: async (id: string) => {
    const deletedHoliday = await holidayModel.findByIdAndDelete(id)
    return deletedHoliday
  },
  getHoliday: async (id: string) => {
    const holiday = await holidayModel.findById(id)
    return holiday
  },
  getHolidaysByYear: async (year: number) => {
    const holidays = await holidayModel
      .find({ date: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) } })
      .sort({ date: -1 })
    return holidays
  }
}

export default holidayService
