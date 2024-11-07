import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { IoBriefcaseOutline, IoCreateOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import MenuDetailUser from "./components/MenuDetailUser";
import useFetchUser from "./hooks/useFetchUser";

const DetailUser = () => {
  const user = useFetchUser();
  const navigate = useNavigate();
  const handleClickEdit = () => {
    navigate(`/admin/users/edit/${user._id}`);
  };
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex p-3 px-6 justify-between border-b-2 border-cyan-100">
          <div className="flex gap-4">
            <img
              className="w-24 h-24 object-cover rounded-lg"
              src={user.image}
              alt=""
            />
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-800 mr-2">
                  {user.name}
                </h1>
                <span
                  className={`text-sm font-medium ${
                    user.isAdmin ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  ({user.isAdmin ? "Admin" : "Employee"})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IoBriefcaseOutline size={20} />
                <p>{user.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <IoMailOutline size={20} />
                <p>{user.username}</p>
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <Button
              className="bg-cyan-400 hover:!bg-cyan-500"
              size="large"
              type="primary"
              icon={<IoCreateOutline size={20} />}
              onClick={handleClickEdit}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      <div className="flex pt-5 gap-5 px-5">
        <MenuDetailUser />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
