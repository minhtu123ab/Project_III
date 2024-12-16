import payrollModel from '~/models/payrollModel'

const payrollService = {
  getAllPayrollByMonth: async (month: number, year: number, limit: number, page: number, name?: string) => {
    const query: { month: number; year: number } = { month, year }
    const startIndex = (page - 1) * limit

    const totalCount = await payrollModel
      .find(query)
      .populate({
        path: 'user_id',
        match: name ? { name: { $regex: name, $options: 'i' } } : undefined
      })
      .then((results) => results.filter((item) => item.user_id !== null).length)

    const payrolls = (
      await payrollModel
        .find(query)
        .populate({
          path: 'user_id',
          select: 'name',
          match: name ? { name: { $regex: name, $options: 'i' } } : undefined
        })
        .then((results) => results.filter((item) => item.user_id !== null))
    ).slice(startIndex, startIndex + limit)

    return { payrolls, totalCount }
  },
  getAllPayroll: async (month: number, year: number) => {
    const payrolls = await payrollModel.find({ month, year }).populate('user_id', 'name')
    return payrolls
  },
  responsePayroll: async (id: string, status: string) => {
    const payroll = await payrollModel.findByIdAndUpdate(id, { status })
    return payroll
  },
  getPayrollByUserId: async (user_id: string, month: number, year: number) => {
    const payroll = await payrollModel.findOne({ user_id, month, year }).populate('user_id', 'name')
    return payroll
  }
}

export default payrollService
