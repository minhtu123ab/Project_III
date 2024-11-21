import Navbar from "./Navbar";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const data = [
  {
    icon: <IoGridOutline size={25} />,
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <IoPeopleOutline size={25} />,
    title: "All Employees",
    path: "/admin/users",
  },
  {
    icon: <IoCheckmarkCircleOutline size={25} />,
    title: "Attendance",
    path: "/admin/attendance",
  },
  {
    icon: <IoLocationOutline size={25} />,
    title: "Zone",
    path: "/admin/zone",
  },
  {
    icon: <IoCashOutline size={25} />,
    title: "Payroll",
    path: "/admin/payroll",
  },
  {
    icon: <IoDocumentTextOutline size={25} />,
    title: "Requests",
    path: "/admin/requests",
  },
  {
    icon: <IoCalendarOutline size={25} />,
    title: "Holidays",
    path: "/admin/holidays",
  },
  {
    icon: <IoSettingsOutline size={25} />,
    title: "Setting",
    path: "/admin/setting",
  },
];

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Menu data={data} />
      <div className="h-screen p-2 pl-64 pt-20">
        <div className="w-full h-full bg-white rounded-lg p-3 custom-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
