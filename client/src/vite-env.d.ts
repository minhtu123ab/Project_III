/// <reference types="vite/client" />
interface IFormLoginProps {
  handleClickForgot: () => void;
}

interface IDataLogin {
  username: string;
  password: string;
}

interface IDecodeToken {
  isAdmin: boolean;
  role: string;
  name: string;
  id: string;
  iat: number;
  exp: number;
  image: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

interface IDataUpdateUser {
  image?: File | File[] | string;
  name: string;
  phone: string;
  national_id: string;
  gender: string;
  base_salary: string;
  role: string;
  isAdmin: boolean;
  status: string;
  address?: string;
  birth_date?: Date | string | null;
}

interface IDataUser {
  _id: string;
  username: string;
  name: string;
  role: string;
  base_salary: string;
  phone: string;
  national_id: string;
  gender: string;
  image: string;
  hire_date: Date;
  isAdmin: boolean;
  off_date: Date | null;
  address: string;
  status: string;
  birth_date: Date | null;
}

interface IDataCreateUser {
  username: string;
  name: string;
  role: string;
  base_salary: string;
  phone: string;
  national_id: string;
  gender: string;
  isAdmin: boolean;
}

interface IHandleModal {
  openModal: () => void;
  closeModal: () => void;
}

interface IDataChangePassword {
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}

interface IControllerInput {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  name: string;
  labelName: string;
  required: boolean;
  type?: string;
  name: string;
  money?: boolean;
}

interface IControllerSelect extends IControllerInput {
  data: { value: string | boolean; label: string }[];
}
