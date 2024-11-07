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
          </Route>
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="zone" element={<Zone />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
