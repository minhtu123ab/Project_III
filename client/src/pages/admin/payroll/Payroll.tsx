import { Button, DatePicker, message } from "antd";
import {
  IoCheckmarkOutline,
  IoCloseOutline,
  IoEyeOutline,
} from "react-icons/io5";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { LIMIT } from "../../../globalVariable";
import InputSearch from "../../../components/InputSearch";
import ModalDetails from "./ModalDetails";
import { IoShareOutline } from "react-icons/io5";
import { unparse } from "papaparse";
import { saveAs } from "file-saver";

const Payroll = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [payrolls, setPayrolls] = useState<IDataPayroll[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [dataDetails, setDataDetails] = useState<IDataPayroll>(
    {} as IDataPayroll
  );

  const handleModalDetailsRef = useRef<IHandleModal>(null);

  const handleModal = (data: IDataPayroll) => {
    setDataDetails(data);
    handleModalDetailsRef.current?.openModal();
  };

  const fetchPayrolls = useCallback(async () => {
    try {
      const month = searchParams.get("month") || new Date().getMonth();
      const year = searchParams.get("year") || new Date().getFullYear();
      const name = searchParams.get("name");
      const page = searchParams.get("page")
        ? parseInt(searchParams.get("page")!)
        : 1;
      const response = await axiosInstance.get("/payroll", {
        params: { month, year, name, page, limit: LIMIT },
      });
      setPayrolls(response.data.payrolls);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPayrolls();
  }, [fetchPayrolls, searchParams]);

  const handleApprove = async (id: string) => {
    try {
      await axiosInstance.put(`/payroll/${id}`, {
        status: "Completed",
      });
      message.success("Payroll completed successfully");
      fetchPayrolls();
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
      await axiosInstance.put(`/payroll/${id}`, {
        status: "Rejected",
      });
      message.success("Payroll declined successfully");
      fetchPayrolls();
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
      searchParams.set("month", (date.month() + 1).toString());
      searchParams.set("year", date.year().toString());
      setSearchParams(searchParams);
    }
  };

  const exportToCSV = async (fileName: string) => {
    try {
      const month = searchParams.get("month") || new Date().getMonth();
      const year = searchParams.get("year") || new Date().getFullYear();
      const response = await axiosInstance.get("/payroll/all", {
        params: { month, year },
      });
      const dataExport = response.data.payrolls.map(
        (item: IDataPayroll, index: number) => ({
          No: index + 1,
          "Name Employee": item.user_id.name,
          Month: item.month,
          Year: item.year,
          Salary: item.salary,
          "Total Present": item.total_present,
          "Total Absent": item.total_absent,
          "Total Leaves": item.total_leaves,
          "Total Late": item.total_late,
          "Total Under Hours": item.total_under_hours,
          "Total Holidays": item.total_holidays,
          "Total Business Trips": item.total_business_trip,
          "Total Working Hours": item.total_hours,
          "Total Salary": item.total_salary,
          Status: item.status,
        })
      );
      const csv = unparse(dataExport);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      saveAs(blob, `${fileName}.csv`);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-gray-800 font-semibold">Payroll</h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <InputSearch />
          <DatePicker
            size="large"
            picker="month"
            placeholder="Select Month"
            onChange={handleMonthChange}
            value={dayjs(
              `${searchParams.get("year") || new Date().getFullYear()}-${
                searchParams.get("month") || new Date().getMonth()
              }`
            )}
          />
        </div>
        <Button
          type="primary"
          className="bg-cyan-400 hover:!bg-cyan-500"
          size="large"
          icon={<IoShareOutline size={20} />}
          onClick={() => exportToCSV(`PayrollMonth${payrolls[0].month}`)}
        >
          Export
        </Button>
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
              CTC
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Salary Per Month
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Total Working Hours
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
          {payrolls.map((payroll, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-center">
                {payroll?.user_id?.name}
              </td>
              <td className="py-3 px-4 text-center">
                {payroll?.total_salary.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="py-3 px-4 text-center">
                {payroll?.salary.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="py-3 px-4 text-center">
                {Number(payroll?.total_hours || 0).toFixed(2)} Hrs
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-5 py-1 rounded-full 
                  ${
                    payroll?.status === "Pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : payroll?.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {payroll?.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {payroll?.status === "Pending" ? (
                  <div className="flex justify-center gap-3">
                    <Button
                      className="text-green-600 hover:!text-green-400"
                      type="text"
                      icon={<IoEyeOutline size={20} />}
                      onClick={() => handleModal(payroll)}
                    />
                    <Button
                      icon={<IoCheckmarkOutline size={20} />}
                      style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                      className="border-none"
                      onClick={() => handleApprove(payroll._id)}
                    />
                    <Button
                      icon={<IoCloseOutline size={20} />}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                      className="border-none"
                      onClick={() => handleDecline(payroll._id)}
                    />
                  </div>
                ) : (
                  <Button
                    className="text-green-600 hover:!text-green-400"
                    type="text"
                    icon={<IoEyeOutline size={20} />}
                    onClick={() => handleModal(payroll)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalCount={totalCount} />
      <ModalDetails ref={handleModalDetailsRef} data={dataDetails} />
    </div>
  );
};

export default Payroll;
