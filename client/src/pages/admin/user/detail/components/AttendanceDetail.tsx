import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../../../axios/axiosInstance";
import axios from "axios";
import { DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";

const AttendanceDetail = () => {
  const user_id = useParams().id;

  const [dataAttendance, setDataAttendance] = useState<IDataAttendance[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const month = searchParams.get("month") || new Date().getMonth() + 1;
        const year = searchParams.get("year") || new Date().getFullYear();
        const response = await axiosInstance.get(
          `/attendance/month/${user_id}`,
          {
            params: { month, year },
          }
        );
        const attendances = response.data.attendances.map(
          (item: IDataAttendance) => {
            const utcDate = new Date(item.date);
            const vietnamTime = new Date(
              utcDate.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
            );
            return { ...item, date: vietnamTime };
          }
        );
        setDataAttendance(attendances);
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
  }, [user_id, searchParams]);

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      searchParams.set("month", (date.month() + 1).toString());
      searchParams.set("year", date.year().toString());
      setSearchParams(searchParams);
    }
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
      case "On A Business Trip":
        return "bg-teal-200 text-teal-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        size="large"
        picker="month"
        placeholder="Select Month"
        onChange={handleMonthChange}
        value={dayjs(
          `${searchParams.get("year") || new Date().getFullYear()}-${
            searchParams.get("month") || new Date().getMonth() + 1
          }`
        )}
        className="w-full"
      />
      <div className="overflow-x-auto max-h-[400px] border rounded-lg custom-scrollbar">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="text-sm text-gray-700">Date</th>
              <th className="text-sm text-gray-700">Check In</th>
              <th className="text-sm text-gray-700">Check Out</th>
              <th className="text-sm text-gray-700">Working Hours</th>

              <th className="text-sm text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataAttendance.map((item, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td className={`${!item.check_in && "text-gray-500 italic"}`}>
                  {item?.check_in || "N/A"}
                </td>
                <td className={`${!item.check_out && "text-gray-500 italic"}`}>
                  {item?.check_out || "N/A"}
                </td>
                <td
                  className={`${!item.working_hours && "text-gray-500 italic"}`}
                >
                  {item?.working_hours || "N/A"} {item?.working_hours && "Hrs"}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDetail;
