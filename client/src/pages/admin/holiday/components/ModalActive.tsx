import { yupResolver } from "@hookform/resolvers/yup";
import { message, Modal } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ControllerInput from "../../../../components/ControllerInput";
import axios from "axios";
import axiosInstance from "../../../../axios/axiosInstance";

interface IPropModal<T> {
  data?: T;
  fetchData: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  date: yup.mixed<Date | string>().required("Full Date is required"),
});

const ModalActive = forwardRef(
  <T extends { _id: string; name: string; date: string }>(
    { data, fetchData }: IPropModal<T>,
    ref: React.ForwardedRef<unknown>
  ) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: data?.name || "",
        date: data ? data.date.split("T")[0] : "",
      },
    });

    useEffect(() => {
      reset({
        name: data?.name || "",
        date: data ? data.date.split("T")[0] : "",
      });
    }, [data, reset]);

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

    const onSubmit = async (values: IDataHoliday) => {
      try {
        !data
          ? await axiosInstance.post("/holiday", values)
          : await axiosInstance.put(`/holiday/${data._id}`, values);
        !data
          ? message.success("Created Holiday successfully")
          : message.success("Updated Holiday successfully");
        fetchData();
        reset();
        closeModal();
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          message.error(err.response.data.message);
        } else {
          message.error("An unexpected error occurred");
        }
      }
    };

    return (
      <Modal
        onOk={handleSubmit(onSubmit)}
        title={`${data ? "Update Holiday" : "Create Holiday"}`}
        open={visible}
        onCancel={closeModal}
        okType="danger"
        destroyOnClose
      >
        <div className="flex flex-col gap-5">
          <ControllerInput
            control={control}
            errors={errors}
            name="name"
            labelName="Holiday Name"
            required
          />
          <ControllerInput
            control={control}
            errors={errors}
            name="date"
            labelName="Selected Date"
            required
            type="date"
          />
        </div>
      </Modal>
    );
  }
);

export default ModalActive;
