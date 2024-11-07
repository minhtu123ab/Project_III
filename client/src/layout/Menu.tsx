import { IoGridOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

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
    title: "Applications",
    path: "/admin/applications",
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

const Menu = () => {
  return (
    <div className="fixed left-0 w-64 p-2 h-screen">
      <div className="bg-white p-2 flex flex-col gap-3 h-full rounded-lg">
        <div className="flex items-center gap-2 mb-4 justify-center mt-2 mr-3">
          <img src="/logo.svg" alt="" className="w-8" />
          <p className="text-2xl font-semibold">Work Time</p>
        </div>
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-5 mx-3 hover:bg-cyan-100 p-3 px-4 rounded-full cursor-pointer ${
                isActive
                  ? "bg-cyan-100 text-cyan-500 font-semibold border-cyan-500 border-l-2"
                  : ""
              }`
            }
          >
            {item.icon}
            <p className="text-lg">{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Menu;
