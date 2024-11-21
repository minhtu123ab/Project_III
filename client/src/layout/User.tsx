import Navbar from "./Navbar";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const data = [
  {
    icon: <IoCheckmarkCircleOutline size={25} />,
    title: "Attendance",
    path: "/user/attendance",
  },
  {
    icon: <IoCashOutline size={25} />,
    title: "Payroll",
    path: "/user/payroll",
  },
  {
    icon: <IoDocumentTextOutline size={25} />,
    title: "Requests",
    path: "/user/requests",
  },
  {
    icon: <IoCalendarOutline size={25} />,
    title: "Holidays",
    path: "/user/holidays",
  },
  {
    icon: <IoSettingsOutline size={25} />,
    title: "Setting",
    path: "/user/setting",
  },
];

const User = () => {
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

export default User;
