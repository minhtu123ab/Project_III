import {
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoCalendarClearOutline,
} from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";

const data = [
  {
    icon: <IoPersonOutline size={25} />,
    title: "Profile",
    path: "profile",
  },
  {
    icon: <IoCheckmarkCircleOutline size={25} />,
    title: "Attendance",
    path: "attendance",
  },
  {
    icon: <IoCalendarClearOutline size={25} />,
    title: "Leave",
    path: "leave",
  },
];

const MenuDetailUser = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="flex flex-col border-2 rounded-lg border-cyan-100 w-52 overflow-hidden">
        {data.map((item, index) => (
          <NavLink
            key={index}
            to={`/admin/users/detail/${id}/${item.path}`}
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
