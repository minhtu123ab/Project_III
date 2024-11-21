import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Request = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Request;
