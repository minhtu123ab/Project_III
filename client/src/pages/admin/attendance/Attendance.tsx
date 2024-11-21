import { Button, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IDataAttendanceAllByDay {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    role: string;
  };
  date: string;
  check_in?: string;
  check_out?: string;
  status: string;
}

const Attendance = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDay =
    searchParams.get("day") || new Date().toISOString().split("T")[0];
  const [day, setDay] = useState<string>(initialDay);
  const [data, setData] = useState<IDataAttendanceAllByDay[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/attendance/day?day=${day}`);
        setData(response.data.attendances);
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          message.error(err.response.data.message);
        } else {
          message.error("An unexpected error occurred");
        }
      }
    };
    fetchData();

    setSearchParams({ day });
  }, [day, setSearchParams]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-200 text-green-600";
      case "Absent":
        return "bg-red-200 text-red-600";
      case "Late":
        return "bg-yellow-200 text-yellow-600";
      case "On Leave":
        return "bg-blue-200 text-blue-600";
      case "Holiday":
        return "bg-purple-200 text-purple-600";
      case "Under Hours":
        return "bg-orange-200 text-orange-600";
      case "Weekend":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Attendance</h1>
      <form>
        <Input
          type="date"
          value={day}
          onChange={handleDateChange}
          size="large"
        />
      </form>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-sm text-gray-700">No.</th>
            <th className="text-sm text-gray-700">Name</th>
            <th className="text-sm text-gray-700">Role</th>
            <th className="text-sm text-gray-700">Check In</th>
            <th className="text-sm text-gray-700">Check Out</th>
            <th className="text-sm text-gray-700">Status</th>
            <th className="text-sm text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="border-b border-gray-300" key={index}>
              <td>{index + 1}</td>
              <td>{item.user_id.name}</td>
              <td>{item.user_id.role}</td>
              <td>
                {item.check_in ? (
                  item.check_in
                ) : (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td>
                {item.check_out ? (
                  item.check_out
                ) : (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td>
                <span
                  className={`px-4 py-1 rounded-lg ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <Button
                  className="text-green-600 hover:!text-green-400"
                  type="text"
                  icon={<IoEyeOutline size={20} />}
                  onClick={() =>
                    navigate(
                      `/admin/users/detail/${item.user_id._id}/attendance`
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
