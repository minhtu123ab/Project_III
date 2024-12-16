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

interface IDataUserToken {
  isAdmin: boolean;
  role: string;
  name: string;
  _id: string;
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
  textarea?: boolean;
  disabled?: boolean;
}

interface IControllerSelect extends IControllerInput {
  data: { value: string | boolean; label: string }[];
}

interface IDataAttendance {
  _id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  date: Date | string;
  status: string;
  working_hours: number;
}

interface IDayIsMonth {
  date?: Date;
  data?: IDataAttendance;
  empty?: string;
}

interface ISelectedMonth {
  month: number;
  year: number;
}

interface ISelectedYear {
  year: number;
}

interface IDataHoliday {
  name: string;
  date: Date | string;
}

interface IDataHolidayApi extends IDataHoliday {
  _id: string;
  isPast: boolean;
}

interface IDataRequestLeave {
  date: Date | string;
  description: string;
}

interface IDataRequestAttendance extends IDataRequestLeave {
  check_in: string;
  check_out: string;
}

interface IDataRequest {
  _id: string;
  user_id: string;
  date: Date | string;
  description: string;
  status: "Pending" | "Approved" | "Rejected" | string;
  check_in?: string;
  check_out?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  title: "Attendance Change" | "Leave Request" | string;
}

interface ILeaveRequest {
  _id: string;
  user_id: {
    _id: string;
    name: string;
  };
  title: string;
  description: string;
  date: Date;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IAttendanceChangeRequest extends ILeaveRequest {
  check_in: string;
  check_out: string;
}

interface IDataPayroll {
  _id: string;
  user_id: {
    _id: string;
    name: string;
  };
  month: number;
  year: number;
  salary: number;
  total_leaves: number;
  total_late: number;
  total_absent: number;
  total_under_hours: number;
  total_present: number;
  total_holidays: number;
  total_business_trip: number;
  total_salary: number;
  total_hours: number;
  createdAt: string;
  updatedAt: string;
  status: "Pending" | "Completed" | "Rejected";
}

interface DashboardData {
  totalEmployees: number;
  totalPayroll: number;
  attendanceRate: number;
  recentApplications: number;
  holidaysUpcoming: number;
}
