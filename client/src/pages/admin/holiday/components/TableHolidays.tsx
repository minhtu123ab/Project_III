import { Button, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import axiosInstance from "../../../../axios/axiosInstance";
import axios from "axios";
import ActionHolidays from "./ActionHolidays";
import ModalActive from "./ModalActive";
import ModalDelete from "../../../../components/ModalDelete";

const TableHolidays = () => {
  const [data, setData] = useState<IDataHolidayApi[]>([]);

  const handleModalAction = useRef<IHandleModal>(null);
  const handleModalDeleteRef = useRef<IHandleModal>(null);
  const [dataEdit, setDataEdit] = useState<IDataHolidayApi>({
    _id: "",
    name: "",
    date: "",
    isPast: false,
  });
  const [dataDelete, setDataDelete] = useState<IDataHolidayApi>({
    _id: "",
    name: "",
    date: "",
    isPast: false,
  });

  const handleModal = (holiday: IDataHolidayApi) => {
    setDataEdit({
      ...holiday,
      date:
        typeof holiday.date === "string"
          ? holiday.date
          : holiday.date.toISOString(),
    });
    handleModalAction.current?.openModal();
  };

  const handleModalDelete = (holiday: IDataHolidayApi) => {
    setDataDelete({
      ...holiday,
      date:
        typeof holiday.date === "string"
          ? holiday.date
          : holiday.date.toISOString(),
    });
    handleModalDeleteRef.current?.openModal();
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/holiday");
      setData(response.data.holidays);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ActionHolidays fetchData={fetchData} />
      <div className="flex gap-5 items-center mt-5">
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-cyan-300"></div>
          <p>Upcoming</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <p>Past Holidays</p>
        </div>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="!bg-white text-gray-500 font-normal">Date</th>
            <th className="!bg-white text-gray-500 font-normal">Day</th>
            <th className="!bg-white text-gray-500 font-normal">
              Holiday Name
            </th>
            <th className="!bg-white text-gray-500 font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((holiday: IDataHolidayApi, index: number) => (
            <tr key={index} className="border-b border-b-gray-100">
              <td>
                <p
                  className={`px-2 h-10 flex items-center border-l-4 ${
                    holiday.isPast ? "border-l-gray-300" : "border-l-cyan-300"
                  }`}
                >
                  {new Date(holiday.date).toLocaleDateString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </p>
              </td>
              <td>
                {new Date(holiday.date).toLocaleString("en-us", {
                  weekday: "long",
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </td>
              <td>{holiday.name}</td>
              <td>
                <Button
                  onClick={() => handleModal(holiday)}
                  className="border-none"
                  icon={<IoCreateOutline size={20} />}
                />
                <Button
                  onClick={() => handleModalDelete(holiday)}
                  className="border-none"
                  icon={<IoTrashOutline size={20} />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalActive
        data={{
          ...dataEdit,
          date:
            typeof dataEdit.date === "string"
              ? dataEdit.date
              : dataEdit.date.toISOString(),
        }}
        ref={handleModalAction}
        fetchData={fetchData}
      />
      <ModalDelete
        nameItem="holiday"
        ref={handleModalDeleteRef}
        data={dataDelete}
        fetchData={fetchData}
      />
    </div>
  );
};

export default TableHolidays;
