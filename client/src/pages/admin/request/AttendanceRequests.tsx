import { Button, DatePicker, message } from "antd";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const AttendanceRequests = () => {
  const today = new Date();
  const vietnamTime = new Date(
    today.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const [selectedMonth, setSelectedMonth] = useState<ISelectedMonth>({
    month: vietnamTime.getMonth() + 1,
    year: vietnamTime.getFullYear(),
  });
  const [requests, setRequests] = useState<IAttendanceChangeRequest[]>([]);

  const fetchRequests = useCallback(async () => {
    try {
      const month = selectedMonth?.month || new Date().getMonth() + 1;
      const year = selectedMonth?.year || new Date().getFullYear();
      const response = await axiosInstance.get("/request/attendance", {
        params: { month, year },
      });
      setRequests(response.data.requests);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  }, [selectedMonth?.month, selectedMonth?.year]);

  useEffect(() => {
    if (selectedMonth) {
      fetchRequests();
    }
  }, [selectedMonth, fetchRequests]);

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`/request/response/${id}`, {
        status: "Approved",
      });
      message.success("Leave request approved successfully");
      fetchRequests();
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await axiosInstance.put(`/request/response/${id}`, {
        status: "Rejected",
      });
      message.success("Leave request declined successfully");
      fetchRequests();
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedMonth({
        month: date.month() + 1,
        year: date.year(),
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4">
      <h1 className="text-2xl text-gray-800 font-semibold mt-2">
        Attendance Requests
      </h1>
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
      <table className="min-w-full border-collapse ">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              No.
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Name Employee
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Request Date
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Desired Date
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Check In
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Check Out
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-center">
                {request?.user_id?.name}
              </td>
              <td className="py-3 px-4 text-center">{request?.description}</td>
              <td className="py-3 px-4 text-center">
                {new Date(request?.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-center">
                {new Date(request?.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-center">
                {new Date(
                  "1970-01-01T" + request.check_in
                ).toLocaleTimeString()}
              </td>
              <td className="py-3 px-4 text-center">
                {new Date(
                  "1970-01-01T" + request.check_out
                ).toLocaleTimeString()}
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-5 py-1 rounded-full 
                  ${
                    request?.status === "Pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : request?.status === "Approved"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {request?.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {request?.status === "Pending" ? (
                  <div className="flex justify-center gap-3">
                    <Button
                      icon={<IoCheckmarkOutline size={20} />}
                      style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                      className="border-none"
                      onClick={() => handleApprove(request._id)}
                    ></Button>
                    <Button
                      icon={<IoCloseOutline size={20} />}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                      className="border-none"
                      onClick={() => handleDecline(request._id)}
                    ></Button>
                  </div>
                ) : request?.status === "Approved" ? (
                  <span className="text-green-700 font-semibold">Approved</span>
                ) : (
                  <span className="text-red-700 font-semibold">Rejected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRequests;
