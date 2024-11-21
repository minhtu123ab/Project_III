import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message, Typography } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ControllerInput from "../../../components/ControllerInput";
import axios from "axios";
import axiosInstance from "../../../axios/axiosInstance";

const schema = yup.object().shape({
  date: yup.date().required("Date is required"),
  description: yup.string().required("Description is required"),
});

const RequestLeave = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IDataRequestLeave) => {
    try {
      await axiosInstance.post("/request/leave", data);
      message.success("Leave request submitted successfully");
      reset();
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
    <div className="p-4 sm:p-6 md:p-8 !pt-4">
      <Typography.Title level={1} className="!text-cyan-800 text-center mb-6">
        Leave Request
      </Typography.Title>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <ControllerInput
          control={control}
          errors={errors}
          name="date"
          labelName="Date"
          required
          type="date"
        />
        <ControllerInput
          control={control}
          errors={errors}
          name="description"
          labelName="Description"
          required
          textarea
        />
        <Button
          type="primary"
          htmlType="submit"
          className="bg-cyan-400 hover:!bg-cyan-500 transition duration-300 ease-in-out"
          size="large"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RequestLeave;
