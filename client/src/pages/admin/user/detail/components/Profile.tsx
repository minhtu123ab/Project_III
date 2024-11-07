import useFetchUser from "../hooks/useFetchUser";
import { format } from "date-fns";

const Profile = () => {
  const user = useFetchUser();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Resigned":
        return "text-red-500";
      case "Leave":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (date: Date | null) => {
    return date ? format(new Date(date), "dd/MM/yyyy") : "Not updated yet";
  };

  const formatSalary = (salary: number) => {
    return salary.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-1 w-full">
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Full Name</p>
        <p>{user.name}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">National ID</p>
        <p>{user.national_id}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Phone Number</p>
        <p>{user.phone}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Email Address</p>
        <p>{user.username}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Gender</p>
        <p>{user.gender}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Date of Birth</p>
        <p>{formatDate(user.birth_date)}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Address</p>
        <p>{user.address ? user.address : "Not updated yet"}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Role</p>
        <p>{user.role}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Hire Date</p>
        <p>{formatDate(user.hire_date)}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Off Date</p>
        <p>{user.off_date ? formatDate(user.off_date) : "Working"}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Base Salary</p>
        <p>{formatSalary(Number(user.base_salary))}</p>
      </div>
      <div className="flex flex-col border-b-2 border-gray-100 p-2">
        <p className="text-sm text-gray-400">Status</p>
        <div>
          <span className={`${getStatusStyle(user.status)}`}>
            {user.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
