interface ICreateUser {
  username: string
  name: string
  role: string
  base_salary: string
  phone: string
  national_id: string
  gender: string
  isAdmin: boolean
}

interface ITokenDecoded {
  id: string
  name: string
  role: string
  isAdmin: boolean
}

interface IUpdateUser {
  image: string | null
  name: string
  phone: string
  national_id: string
  address: string
  gender: string
  birth_date: Date | null
}

interface IAdminUpdateUser extends IUpdateUser {
  role: string
  base_salary: number
  status: string
  isAdmin: boolean
}

interface IAttendanceModel extends Document {
  user_id: mongoose.Types.ObjectId
  date: Date
  status: 'Present' | 'Absent' | 'Late' | 'On Leave' | 'Holiday'
  check_in?: string
  check_out?: string
  working_hours?: string
}

interface IAttendanceModelStatic extends Model<IAttendanceModel> {
  createAttendanceForDay(): Promise<void>
}
