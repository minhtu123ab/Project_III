import { Button } from "antd";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import InputSearch from "../../../../components/InputSearch";

const ActionUsers = () => {
  const navigate = useNavigate();

  const handleClickCreate = () => {
    navigate("/admin/users/create");
  };
  return (
    <div className="flex justify-between">
      <InputSearch />
      <Button
        onClick={handleClickCreate}
        size="large"
        type="primary"
        icon={<IoAddCircleOutline size={20} />}
        className="bg-cyan-400 hover:!bg-cyan-500 text-white"
      >
        Add New Employee
      </Button>
    </div>
  );
};

export default ActionUsers;
