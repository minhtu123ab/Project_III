import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Users from "./pages/admin/user/Users";
import Admin from "./layout/Admin";
import "./App.css";
import CreateUser from "./pages/admin/user/action/CreateUser";
import PrivateAdmin from "./auth/PrivateAdmin";
import DetailUser from "./pages/admin/user/detail/DetailUser";
import Profile from "./pages/admin/user/detail/components/Profile";
import ChangePassword from "./pages/ChangePassword";
import EditUser from "./pages/admin/user/action/EditUser";
import Zone from "./pages/admin/zone/Zone";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import User from "./layout/User";
import AttendancePage from "./pages/user/attendance/Attendance";
import LayoutAttendance from "./pages/user/attendance/LayoutAttendance";
import HistoryAttendance from "./pages/user/attendance/HistoryAttendance";
import Holidays from "./pages/admin/holiday/Holidays";
import UserHolidays from "./pages/user/holiday/UserHolidays";
import LayoutRequest from "./pages/user/request/LayoutRequest";
import RequestAttendance from "./pages/user/request/RequestAttendance";
import RequestLeave from "./pages/user/request/RequestLeave";
import RequestHistory from "./pages/user/request/RequestHistory";
import Request from "./pages/admin/request/Request";
import AttendanceRequests from "./pages/admin/request/AttendanceRequests";
import LeaveRequests from "./pages/admin/request/LeaveRequests";
import Attendance from "./pages/admin/attendance/Attendance";
import AttendanceDetail from "./pages/admin/user/detail/components/AttendanceDetail";
import Leave from "./pages/admin/user/detail/components/Leave";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateAdmin>
              <Admin />
            </PrivateAdmin>
          }
        >
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/detail/:id" element={<DetailUser />}>
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<AttendanceDetail />} />
            <Route path="leave" element={<Leave />} />
          </Route>
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="zone" element={<Zone />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="requests" element={<Request />}>
            <Route path="" element={<Navigate to="attendance" />} />
            <Route path="attendance" element={<AttendanceRequests />} />
            <Route path="leave" element={<LeaveRequests />} />
          </Route>
          <Route path="payroll" element={<div>Payroll</div>} />
          <Route path="setting" element={<div>Setting</div>} />
        </Route>
        <Route path="/user" element={<User />}>
          <Route path="edit/:id" element={<EditUser />} />
          <Route path="detail/:id" element={<DetailUser />}>
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<AttendanceDetail />} />
            <Route path="leave" element={<Leave />} />
          </Route>
          <Route path="attendance" element={<LayoutAttendance />}>
            <Route path="" element={<Navigate to="check" />} />
            <Route path="check" element={<AttendancePage />} />
            <Route path="history" element={<HistoryAttendance />} />
          </Route>
          <Route path="payroll" element={<div>Payroll</div>} />
          <Route path="holidays" element={<UserHolidays />} />
          <Route path="requests" element={<LayoutRequest />}>
            <Route path="" element={<Navigate to="attendance" />} />
            <Route path="attendance" element={<RequestAttendance />} />
            <Route path="leave" element={<RequestLeave />} />
            <Route path="history" element={<RequestHistory />} />
          </Route>
          <Route path="setting" element={<div>Setting</div>} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
