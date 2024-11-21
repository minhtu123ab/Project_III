import { message, Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import axios from "axios";

interface IPropModal<T> {
  data: T;
  fetchData: () => void;
  nameItem: string;
}

const ModalDelete = forwardRef(
  <T extends { _id: string; name: string }>(
    { data, fetchData, nameItem }: IPropModal<T>,
    ref: React.ForwardedRef<unknown>
  ) => {
    const [visible, setVisible] = useState(false);

    const openModal = () => {
      setVisible(true);
    };
    const closeModal = () => {
      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    const handleOk = async () => {
      try {
        await axiosInstance.delete(`/${nameItem}/delete/${data._id}`);
        message.success("Deleted successfully");
        fetchData();
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          message.error(err.response.data.message);
        } else {
          message.error("An unexpected error occurred");
        }
      } finally {
        closeModal();
      }
    };

    return (
      <Modal
        onOk={handleOk}
        title={`Delete ${data.name}`}
        open={visible}
        onCancel={closeModal}
        okType="danger"
        destroyOnClose
      >
        <p>Are you sure you want to delete {data.name}?</p>
      </Modal>
    );
  }
);

export default ModalDelete;
