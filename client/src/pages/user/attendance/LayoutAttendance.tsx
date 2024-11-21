import NavbarMenu from "./NavbarMenu";
import { Outlet } from "react-router-dom";

const LayoutAttendance = () => {
  return (
    <div>
      <NavbarMenu />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAttendance;
