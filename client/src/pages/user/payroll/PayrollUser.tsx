import { DatePicker, Table, message, Typography, Spin, Empty } from "antd";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";

const PayrollUser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [payroll, setPayroll] = useState<IDataPayroll | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPayrolls = useCallback(async () => {
    try {
      setLoading(true);
      const month = searchParams.get("month") || new Date().getMonth() + 1;
      const year = searchParams.get("year") || new Date().getFullYear();
      const response = await axiosInstance.get("/payroll/user", {
        params: { month, year },
      });
      setPayroll(response.data.payroll);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPayrolls();
  }, [fetchPayrolls]);

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      searchParams.set("month", (date.month() + 1).toString());
      searchParams.set("year", date.year().toString());
      setSearchParams(searchParams);
    }
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  const dataSource = payroll
    ? [
        {
          key: "1",
          category: "Salary",
          details: payroll?.salary?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }),
        },
        { key: "2", category: "Total Leaves", details: payroll?.total_leaves },
        {
          key: "3",
          category: "Total Present",
          details: payroll?.total_present,
        },
        { key: "4", category: "Total Late", details: payroll?.total_late },
        { key: "5", category: "Total Absent", details: payroll?.total_absent },
        {
          key: "6",
          category: "Total Holidays",
          details: payroll?.total_holidays,
        },
        { key: "7", category: "Total Hours", details: payroll?.total_hours },
        {
          key: "8",
          category: "Status",
          details: (
            <div
              className={`font-semibold ${
                payroll?.status === "Completed"
                  ? "text-green-500"
                  : payroll?.status === "Rejected"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {payroll?.status}
            </div>
          ),
        },
        {
          key: "9",
          category: <span className="font-semibold">Total Salary</span>,
          details: (
            <span className="font-semibold">
              {payroll?.total_salary?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          ),
        },
      ]
    : [];

  return (
    <div className="flex flex-col px-4 pb-4">
      <div className=" text-center">
        <Typography.Title level={1} className="!text-cyan-500">
          Payroll Details
        </Typography.Title>
      </div>
      <div className="flex justify-between items-center mb-4">
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
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : payroll ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
        />
      ) : (
        <Empty description="No payroll data available" />
      )}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 mt-5">
        <Typography.Title level={3}>
          Payroll Calculation Policies
        </Typography.Title>
        <div className="text-lg">
          <ul className="list-disc pl-6">
            <li>
              **Base Salary** is calculated based on the total working hours in
              the month.
            </li>
            <li>
              **Absences** are deducted at a rate of **100,000 VND per day**.
            </li>
            <li>
              **Late arrivals** incur a deduction of **50,000 VND per
              occurrence**.
            </li>
            <li>
              **Under Hours** (working less than the required hours) are
              penalized at **50,000 VND per hour**.
            </li>
            <li>
              **Public Holidays** and **Business Trips** are compensated with
              **8 hours of the base hourly salary per day**.
            </li>
            <li>
              **Approved Leaves**:
              <ul className="list-disc pl-6">
                <li>
                  Up to **1 day** of leave is compensated with **8 hours of base
                  salary**.
                </li>
                <li>
                  Additional leave days are compensated at a reduced rate of **4
                  hours for each additional day**.
                </li>
              </ul>
            </li>
            <li>
              **Present days** are rewarded with a bonus of **50,000 VND per
              day**.
            </li>
            <li>
              The final salary is calculated as the sum of all earnings and
              deductions. If the total salary is negative, it will default to
              **0 VND**.
            </li>
            <li>
              Salaries will be disbursed on the **10th of every month**. If the
              10th falls on a weekend or holiday, the salary will be paid on the
              next working day.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PayrollUser;
