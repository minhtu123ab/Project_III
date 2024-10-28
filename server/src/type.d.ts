interface ICreateUser {
  username: string
  password: string
  name: string
  role: string
  base_salary: string
  phone: string
  national_id: string
}

interface ITokenDecoded {
  id: string
  name: string
  role: string
}

interface IUpdateUser {
  name: string
  phone: string
  national_id: string
  address: string
}

interface IAdminUpdateUser extends IUpdateUser {
  role: string
  base_salary: number
  status: string
}
