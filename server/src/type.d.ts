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
