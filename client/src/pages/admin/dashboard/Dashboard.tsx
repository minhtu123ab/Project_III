import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Button, message, Spin } from "antd";
import {
  UserOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";

interface DashboardData {
  totalEmployees: number;
  totalPayroll: number;
  attendanceRate: number;
  recentApplications: number;
  holidaysUpcoming: number;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    totalEmployees: 0,
    totalPayroll: 0,
    attendanceRate: 0,
    recentApplications: 0,
    holidaysUpcoming: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/dashboard");
      setData(response.data);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    { name: "Total Employees", value: data.totalEmployees, color: "#8884d8" },
    { name: "Attendance Rate", value: data.attendanceRate, color: "#82ca9d" },
    {
      name: "Recent Applications",
      value: data.recentApplications,
      color: "#ffc658",
    },
    {
      name: "Upcoming Holidays",
      value: data.holidaysUpcoming,
      color: "#ff7300",
    },
  ];

  const formatCurrency = (value: unknown) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(value));

  return (
    <div className="min-h-screen bg-white p-8 pt-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-semibold text-cyan-500">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your dashboard for managing key metrics
          </p>
        </div>

        {loading ? (
          // Loading Spinner
          <div className="flex justify-center items-center min-h-[400px]">
            <Spin size="large" tip="Loading data..." />
          </div>
        ) : (
          <>
            {/* Overview Section */}
            <Row gutter={16} className="mb-12">
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
                  title={
                    <span className="text-gray-800 font-semibold text-lg">
                      Total Employees
                    </span>
                  }
                  bordered={false}
                  extra={<UserOutlined className="text-indigo-600 text-4xl" />}
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "10px",
                  }}
                  styles={{
                    header: {
                      backgroundColor: "#f3f4f6",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <Statistic
                    value={data.totalEmployees}
                    valueStyle={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#3B82F6",
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
                  title={
                    <span className="text-gray-800 font-semibold text-lg">
                      Total Payroll
                    </span>
                  }
                  bordered={false}
                  extra={
                    <DollarCircleOutlined className="text-green-600 text-4xl" />
                  }
                  styles={{
                    header: {
                      backgroundColor: "#f3f4f6",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      fontWeight: "bold",
                    },
                    body: {
                      backgroundColor: "#f9fafb",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Statistic
                    value={data.totalPayroll}
                    formatter={formatCurrency}
                    valueStyle={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#10B981",
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
                  title={
                    <span className="text-gray-800 font-semibold text-lg">
                      Attendance Rate
                    </span>
                  }
                  bordered={false}
                  extra={
                    <CheckCircleOutlined className="text-yellow-500 text-4xl" />
                  }
                  styles={{
                    header: {
                      backgroundColor: "#f3f4f6",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      fontWeight: "bold",
                    },
                    body: {
                      backgroundColor: "#f9fafb",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Statistic
                    value={data.attendanceRate}
                    valueStyle={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#F59E0B",
                    }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>

            {/* Recent Applications & Upcoming Holidays */}
            <Row gutter={16} className="mb-12">
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
                  title={
                    <span className="text-gray-800 font-semibold text-lg">
                      Recent Applications
                    </span>
                  }
                  bordered={false}
                  extra={<FileTextOutlined className="text-red-600 text-4xl" />}
                  styles={{
                    header: {
                      backgroundColor: "#f3f4f6",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      fontWeight: "bold",
                    },
                    body: {
                      backgroundColor: "#f9fafb",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Statistic
                    value={data.recentApplications}
                    valueStyle={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#EF4444",
                    }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out"
                  title={
                    <span className="text-gray-800 font-semibold text-lg">
                      Upcoming Holidays
                    </span>
                  }
                  bordered={false}
                  extra={
                    <CalendarOutlined className="text-purple-600 text-4xl" />
                  }
                  styles={{
                    header: {
                      backgroundColor: "#f3f4f6",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      fontWeight: "bold",
                    },
                    body: {
                      backgroundColor: "#f9fafb",
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Statistic
                    value={data.holidaysUpcoming}
                    valueStyle={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "#8B5CF6",
                    }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Chart Section */}
            <div className="bg-white p-8 rounded-xl shadow-xl mb-12">
              <h3 className="text-2xl font-semibold text-gray-600 mb-6">
                Key Metrics Overview
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill={"#22d3ee"}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Section */}
            <div className="text-center">
              <Button
                type="primary"
                size="large"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:!from-cyan-600 hover:!to-blue-600 text-white transition duration-300 ease-in-out"
                onClick={() => fetchData()}
              >
                Refresh Data
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
