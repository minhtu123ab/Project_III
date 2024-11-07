import React, { useState } from "react";
import { Card, Col, Row, Statistic, Button } from "antd";
import {
  UserOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardData {
  totalEmployees: number;
  totalPayroll: number;
  attendanceRate: number;
  recentApplications: number;
  holidaysUpcoming: number;
}

const Dashboard: React.FC = () => {
  const [data] = useState<DashboardData>({
    totalEmployees: 125,
    totalPayroll: 3500000,
    attendanceRate: 92,
    recentApplications: 12,
    holidaysUpcoming: 5,
  });

  const chartData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-semibold text-cyan-800">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your dashboard for managing key metrics
          </p>
        </div>

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
                  fontWeight: "bold", // Làm đậm header
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
              bodyStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
              }}
              styles={{
                header: {
                  backgroundColor: "#f3f4f6",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontWeight: "bold", // Làm đậm header
                },
              }}
            >
              <Statistic
                value={data.totalPayroll}
                valueStyle={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#10B981",
                }}
                prefix="$"
                suffix=" USD"
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
              bodyStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
              }}
              styles={{
                header: {
                  backgroundColor: "#f3f4f6",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontWeight: "bold", // Làm đậm header
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
              bodyStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
              }}
              styles={{
                header: {
                  backgroundColor: "#f3f4f6",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontWeight: "bold", // Làm đậm header
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
              extra={<CalendarOutlined className="text-purple-600 text-4xl" />}
              bodyStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
              }}
              styles={{
                header: {
                  backgroundColor: "#f3f4f6",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  fontWeight: "bold", // Làm đậm header
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
            Monthly Data Chart
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              <Line type="monotone" dataKey="amt" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:!from-cyan-600 hover:!to-blue-600 text-white transition duration-300 ease-in-out"
            onClick={() => console.log("Data refreshed")}
          >
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
