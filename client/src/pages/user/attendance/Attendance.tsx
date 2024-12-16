import { useState, useEffect, useCallback } from "react";
import { Button, Tag, Typography, Divider, Row, Col, message } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";

const AttendancePage = () => {
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);

  const token = localStorage.getItem("token") || null;
  const decodeToken: IDecodeToken | null = token ? jwtDecode(token) : null;
  const user_id = decodeToken?.id;

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          message.error("Unable to retrieve location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      message.error("Geolocation is not supported");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const date = new Date().setHours(0, 0, 0, 0);
      const response = await axiosInstance.get(`/attendance/${user_id}`, {
        params: { date },
      });
      const { attendance } = response.data;
      if (attendance.check_in) {
        setCheckInTime(attendance.check_in);
      }
      if (attendance.check_out) {
        setCheckOutTime(attendance.check_out);
      }
      if (attendance.working_hours) {
        setTotalWorkingHours(attendance.working_hours);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  }, [user_id]);

  const handleCheckIn = async () => {
    try {
      if (location) {
        await axiosInstance.post("/attendance/check-in", {
          user_id,
          latitude: location.lat,
          longitude: location.lng,
        });
        message.success("Checked in successfully");
        const checkInTime = new Date().toLocaleTimeString();
        setCheckInTime(checkInTime);
        fetchData();
      } else {
        message.error("Unable to get your location.");
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  const handleCheckOut = async () => {
    try {
      if (location) {
        await axiosInstance.post("/attendance/check-out", {
          user_id,
          latitude: location.lat,
          longitude: location.lng,
        });
        message.success("Checked out successfully");
        const checkOutTime = new Date().toLocaleTimeString();
        setCheckOutTime(checkOutTime);
        fetchData();
      } else {
        message.error("Unable to get your location.");
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    fetchData();

    getCurrentLocation();

    return () => clearInterval(interval);
  }, [fetchData, user_id]);

  return (
    <div className="p-2 sm:p-2">
      <div className="mb-5 text-center">
        <Typography.Title level={1} className="!text-cyan-500">
          Check Attendance
        </Typography.Title>
        <div className="text-xl font-semibold text-gray-600">
          <ClockCircleOutlined className="mr-2" />
          Current Time: {currentTime}
        </div>
      </div>

      <div className="flex justify-center gap-8 mb-5 flex-wrap">
        <Button
          type="primary"
          size="large"
          icon={<CheckCircleOutlined />}
          className={`text-2xl px-10 py-6 rounded-lg bg-cyan-400 ${
            !checkInTime ? "hover:!bg-cyan-500" : ""
          } transition-all`}
          onClick={handleCheckIn}
          disabled={checkInTime.length > 0}
        >
          Check-in
        </Button>
        <Button
          danger
          size="large"
          icon={<CloseCircleOutlined />}
          className="text-2xl px-10 py-6 rounded-lg bg-red-400 hover:bg-red-500 transition-all"
          onClick={handleCheckOut}
        >
          Check-out
        </Button>
      </div>

      <div className="text-center mb-8 flex flex-col gap-2 justify-center items-center">
        {checkInTime ? (
          <Tag color="green" className="text-xl p-1 px-2">
            Checked-in at {checkInTime}
          </Tag>
        ) : (
          <Tag color="gray" className="text-xl p-1 px-2">
            Not checked in
          </Tag>
        )}
        {checkOutTime ? (
          <Tag color="red" className="text-xl p-1 px-2">
            Checked-out at {checkOutTime}
          </Tag>
        ) : (
          <Tag color="gray" className="text-xl p-1 px-2">
            Not checked out
          </Tag>
        )}
      </div>

      <div className="flex gap-8 flex-wrap">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
          <Typography.Title level={3}>Work Stats</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Text strong>Today's Work Hours:</Typography.Text>
              <div className="text-xl">
                {checkInTime && !checkOutTime ? (
                  <span>Working...</span>
                ) : (
                  <span>
                    {checkInTime && checkOutTime
                      ? `${totalWorkingHours} hours`
                      : "0 hours"}
                  </span>
                )}
              </div>
            </Col>
          </Row>
          <Divider />
          <Typography.Text>
            Make sure to check-in when you arrive!
          </Typography.Text>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1">
          <Typography.Title level={3}>Attendance Regulations</Typography.Title>
          <div className="text-lg">
            <ul className="list-disc pl-6">
              <li>Check-in before 8:00 AM to mark your attendance.</li>
              <li>Check-out after completing your workday.</li>
              <li>If you forget to check-in or check-out, please inform HR.</li>
              <li>
                Late check-in or check-out will be penalized as per company
                policy.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
