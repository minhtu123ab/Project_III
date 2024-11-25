import { Button, DatePicker, message, Typography } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const HistoryAttendance = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || null;
  const decodeToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const user_id = decodeToken?.id;

  const today = new Date();
  const vietnamTime = new Date(
    today.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const [selectedMonth, setSelectedMonth] = useState<ISelectedMonth>({
    month: vietnamTime.getMonth() + 1,
    year: vietnamTime.getFullYear(),
  });

  const [dataAttendance, setDataAttendance] = useState<IDataAttendance[]>([]);
  const [daysInMonth, setDaysInMonth] = useState<IDayIsMonth[]>([]);
  const [selectDetailDay, setSelectedDetailDay] =
    useState<IDataAttendance | null>();
  const [visibleDetail, setVisibleDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const month = selectedMonth?.month || new Date().getMonth() + 1;
        const year = selectedMonth?.year || new Date().getFullYear();
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

    if (selectedMonth) {
      fetchData();
    }
  }, [user_id, selectedMonth]);

  useEffect(() => {
    if (selectedMonth) {
      const { month, year } = selectedMonth;

      const lastDay = new Date(year, month, 0);
      const numberOfDays = lastDay.getDate();

      const days: IDayIsMonth[] = [];
      const day = new Date(year, month - 1, 1);
      const vietnamTime = new Date(
        day.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
      );
      const count = vietnamTime.getDay();
      if (count === 0) {
        for (let i = 0; i < 6; i++) {
          days.push({ empty: "" });
        }
      } else {
        for (let i = 1; i < count; i++) {
          days.push({ empty: "" });
        }
      }
      for (let day = 1; day <= numberOfDays; day++) {
        const date = new Date(year, month - 1, day);
        const vietnamTime = new Date(
          date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        );

        const attendanceForDay = dataAttendance.find(
          (item) => vietnamTime.getTime() === new Date(item.date).getTime()
        );
        if (attendanceForDay) {
          days.push({ date: vietnamTime, data: attendanceForDay });
        } else {
          days.push({ date: vietnamTime });
        }
      }

      setDaysInMonth(days);
    }
  }, [dataAttendance, selectedMonth]);

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedMonth({
        month: date.month() + 1,
        year: date.year(),
      });
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "Present":
        return "bg-green-200";
      case "Absent":
        return "bg-red-200";
      case "Late":
        return "bg-yellow-200";
      case "On Leave":
        return "bg-blue-200";
      case "Holiday":
        return "bg-purple-200";
      case "Under Hours":
        return "bg-orange-200";
      case "Weekend":
        return "bg-gray-200";
      case "On A Business Trip":
        return "bg-teal-200";
      default:
        return "bg-white";
    }
  };

  const handleDetailDay = (data: IDataAttendance | null) => {
    setSelectedDetailDay(data);
    setVisibleDetail(true);
  };

  return (
    <div className="p-2 w-full mx-auto">
      <Typography.Title level={1} className="!text-cyan-800 text-center">
        History Attendance
      </Typography.Title>
      <div className="flex justify-between items-center mb-4">
        <DatePicker
          size="large"
          picker="month"
          placeholder="Select Month"
          onChange={handleMonthChange}
          value={
            selectedMonth
              ? dayjs(`${selectedMonth.year}-${selectedMonth.month}`)
              : null
          }
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-7 gap-4 text-center">
        <p className="font-semibold">Mon</p>
        <p className="font-semibold">Tue</p>
        <p className="font-semibold">Wed</p>
        <p className="font-semibold">Thu</p>
        <p className="font-semibold">Fri</p>
        <p className="font-semibold">Sat</p>
        <p className="font-semibold">Sun</p>

        {daysInMonth.map((day, index) => (
          <div
            onClick={() => handleDetailDay(day.data || null)}
            key={index}
            className={`p-4 border rounded-lg ${
              day.date && !day.data ? "!bg-cyan-200" : ""
            } ${
              day.data
                ? getStatusColor(day.data.status) + " cursor-pointer"
                : "bg-gray-100"
            }`}
            title={day.data?.status || "No attendance"}
          >
            <span className="block text-lg font-bold">
              {day.date?.getDate()}
            </span>
          </div>
        ))}
      </div>
      {visibleDetail && selectDetailDay && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-3xl mx-auto">
          <Typography.Title level={3} className="text-center text-xl mb-6">
            Day Details - {new Date(selectDetailDay.date).toLocaleDateString()}
          </Typography.Title>
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center">
              <Typography.Text className="text-lg">
                Check In: {selectDetailDay.check_in}
              </Typography.Text>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center">
              <Typography.Text className="text-lg">
                Check Out: {selectDetailDay.check_out}
              </Typography.Text>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center">
              <Typography.Text className="text-lg">
                Working Hours: {selectDetailDay.working_hours} Hrs
              </Typography.Text>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 flex justify-center items-center">
              <Typography.Text className="text-lg">
                Status:{" "}
                <span
                  className={`text-lg px-2 py-1 rounded-full ${getStatusColor(
                    selectDetailDay.status
                  )}`}
                >
                  {selectDetailDay.status}
                </span>
              </Typography.Text>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="bg-cyan-400 hover:!bg-cyan-500"
              type="primary"
              size="large"
              onClick={() =>
                navigate(
                  `/user/requests/attendance?date=${selectDetailDay.date}`
                )
              }
            >
              Submit Attendance Adjustment Request
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryAttendance;
