import React from "react";
import { NavLink } from "react-router-dom";

interface IMenu {
  data: {
    icon: JSX.Element;
    title: string;
    path: string;
  }[];
}

const Menu: React.FC<IMenu> = ({ data }) => {
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
