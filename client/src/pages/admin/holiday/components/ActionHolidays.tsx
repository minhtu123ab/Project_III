import { Button, Input } from "antd";
import { useRef } from "react";
import { IoAddCircleOutline, IoSearchOutline } from "react-icons/io5";
import ModalActive from "./ModalActive";

const ActionHolidays = ({ fetchData }: { fetchData: () => void }) => {
  const handleModalAction = useRef<IHandleModal>(null);
  const handleModal = () => {
    handleModalAction.current?.openModal();
  };
  return (
    <div className="flex justify-between">
      <form>
        <Input
          size="large"
          placeholder="Search"
          prefix={<IoSearchOutline size={20} />}
          className="w-72"
        />
      </form>
      <Button
        onClick={handleModal}
        size="large"
        type="primary"
        icon={<IoAddCircleOutline size={20} />}
        className="bg-cyan-400 hover:!bg-cyan-500 text-white"
      >
        Add New Holiday
      </Button>
      <ModalActive ref={handleModalAction} fetchData={fetchData} />
    </div>
  );
};

export default ActionHolidays;
