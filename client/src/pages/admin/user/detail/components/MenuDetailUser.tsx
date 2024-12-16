import { jwtDecode } from "jwt-decode";
import {
  IoPersonOutline,
  IoCalendarOutline,
  IoAirplaneOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";

const data = [
  {
    icon: <IoPersonOutline size={25} />,
    title: "Profile",
    path: "profile",
  },
  {
    icon: <IoCalendarOutline size={25} />,
    title: "Attendance",
    path: "attendance",
  },
  {
    icon: <IoAirplaneOutline size={25} />,
    title: "Leave",
    path: "leave",
  },
  {
    icon: <IoDocumentTextOutline size={25} />,
    title: "Request",
    path: "request",
  },
];

const MenuDetailUser = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token") || null;
  const decodeToken: IDecodeToken | null = token ? jwtDecode(token) : null;

  return (
    <div>
      <div className="flex flex-col border-2 rounded-lg border-cyan-100 w-52 overflow-hidden sticky top-0 z-10">
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={
              decodeToken?.isAdmin
                ? `/admin/users/detail/${id}/${item.path}`
                : `/user/detail/${id}/${item.path}`
            }
            className={({ isActive }) =>
              `flex items-center p-3 gap-2 hover:bg-cyan-400 hover:text-white ${
                isActive ? "bg-cyan-400 text-white" : ""
              }`
            }
          >
            {item.icon}
            <p>{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MenuDetailUser;
