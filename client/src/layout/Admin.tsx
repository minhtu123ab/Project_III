import Navbar from "./Navbar";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <Menu />
      <div className="h-screen p-2 pl-64 pt-20">
        <div className="w-full h-full bg-white rounded-lg p-3 custom-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
