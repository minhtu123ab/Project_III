import { Button, Input, Dropdown, MenuProps, message } from "antd";
import { IoChevronDown, IoKeyOutline, IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoLogOutOutline, IoDocumentOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import decodeToken from "../utils/decodeToken";
import React, { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axios/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate("/login");
    localStorage.removeItem("token");
    message.success("You've been logged out successfully!");
  };
  const handleChangePasswordClick = () => {
    navigate("/admin/change-password");
  };

  const [urlImage, setUrlImage] = React.useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/${decodeToken?.id}`);
        setUrlImage(response.data.data.image);
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          message.error(err.response.data.message);
        } else {
          message.error("An unexpected error occurred");
        }
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, []);

  const menuItems: MenuProps["items"] = [
    {
      key: "Detail",
      icon: <IoDocumentOutline size={20} color="blue" />,
      label: "Information",
      onClick: () => navigate(`/admin/users/detail/${decodeToken?.id}/profile`),
    },
    {
      key: "ChangePassword",
      icon: <IoKeyOutline size={20} color="green" />,
      label: "Change Pass",
      onClick: handleChangePasswordClick,
    },
    {
      key: "Logout",
      icon: <IoLogOutOutline size={20} color="red" />,
      label: "Logout",
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="fixed top-0 w-full p-2 pl-64">
      <div className="w-full h-full bg-white rounded-lg">
        <div className="flex p-3 justify-between">
          <div className="flex flex-col justify-around">
            <strong className="font-semibold text-lg">
              Hello {decodeToken?.name}
            </strong>
            <p className="text-xs text-gray-500">Good Morning</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
              <Input
                placeholder="Search"
                prefix={<IoSearchOutline size={20} />}
                size="large"
              />
            </div>
            <div className="flex items-center">
              <Button size="large" className="bg-gray-100 rounded-md p-1.5">
                <IoNotificationsOutline size={25} />
              </Button>
            </div>
            <div className="flex items-center">
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <Button className="h-11 flex justify-between p-1">
                  <img src={urlImage} alt="" className="w-9 h-9 rounded-md" />
                  <div>
                    <p className="text-black font-semibold">
                      {decodeToken?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {decodeToken?.isAdmin ? "Admin" : "Employee"}
                    </p>
                  </div>
                  <IoChevronDown size={20} />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
