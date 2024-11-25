import { useEffect, useState } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";
import { DatePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";

const UserHolidays = () => {
  const [data, setData] = useState<IDataHolidayApi[]>([]);

  const today = new Date();
  const vietnamTime = new Date(
    today.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const [selectedYear, setSelectedYear] = useState<ISelectedYear>({
    year: vietnamTime.getFullYear(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = selectedYear?.year || new Date().getFullYear();
        const response = await axiosInstance.get("/holiday", {
          params: { year },
        });
        setData(response.data.holidays);
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          message.error(err.response.data.message);
        } else {
          message.error("An unexpected error occurred");
        }
      }
    };
    if (selectedYear) {
      fetchData();
    }
  }, [selectedYear]);

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedYear({
        year: date.year(),
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">Holidays</h1>
      <div>
        <div className="flex justify-between items-center mb-4">
          <DatePicker
            size="large"
            picker="year"
            placeholder="Select Year"
            onChange={handleMonthChange}
            value={selectedYear ? dayjs().set("year", selectedYear.year) : null}
            className="w-full"
          />
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-300"></div>
            <p>Upcoming</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <p>Past Holidays</p>
          </div>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="!bg-white text-gray-500 font-normal">Date</th>
              <th className="!bg-white text-gray-500 font-normal">Day</th>
              <th className="!bg-white text-gray-500 font-normal">
                Holiday Name
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((holiday: IDataHolidayApi, index: number) => (
              <tr key={index} className="border-b border-b-gray-100">
                <td>
                  <p
                    className={`px-2 h-10 flex items-center border-l-4 ${
                      holiday.isPast ? "border-l-gray-300" : "border-l-cyan-300"
                    }`}
                  >
                    {new Date(holiday.date).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}
                  </p>
                </td>
                <td>
                  {new Date(holiday.date).toLocaleString("en-us", {
                    weekday: "long",
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </td>
                <td>{holiday.name}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHolidays;
