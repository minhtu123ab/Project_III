import NavbarMenu from "./NavbarMenu";
import { Outlet } from "react-router-dom";

const LayoutRequest = () => {
  return (
    <div>
      <NavbarMenu />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutRequest;
