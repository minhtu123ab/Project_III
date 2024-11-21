import {
  IoCheckmarkCircleOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

const data = [
  {
    icon: <IoCheckmarkCircleOutline size={25} />,
    title: "Check Attendance",
    path: "/user/attendance/check",
  },
  {
    icon: <IoFileTrayFullOutline size={25} />,
    title: "History Attendance",
    path: "/user/attendance/history",
  },
];

const NavbarMenu = () => {
  return (
    <div className="w-full border-b border-b-cyan-100">
      <div className="flex gap-2 w-full">
        {data.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="relative flex items-center gap-2 pb-2 flex-1 justify-center cursor-pointer text-gray-600 transition-colors duration-300"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`flex items-center gap-2 ${
                    isActive ? "text-cyan-500" : "hover:text-cyan-500"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500 transform transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;
