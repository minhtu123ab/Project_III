import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message, Typography } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ControllerInput from "../../../components/ControllerInput";
import axios from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import ControllerSelect from "../../../components/ControllerSelect";

const schema = yup.object().shape({
  date: yup.date().required("Date is required"),
  description: yup.string().required("Description is required"),
  title: yup.string().required("Title is required"),
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
        <ControllerSelect
          control={control}
          errors={errors}
          name="title"
          labelName="Type Of Leave"
          required
          data={[
            { value: "Leave", label: "Leave" },
            { value: "Business Trip", label: "Business Trip" },
          ]}
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
      <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 mt-5">
        <Typography.Title level={3}>Leave Request Regulations</Typography.Title>
        <div className="text-lg">
          <ul className="list-disc pl-6">
            <li>
              You can submit a leave request (excluding business trips) a
              maximum of **2 times per month**.
            </li>
            <li>
              Business trip requests have no limit and can be submitted as
              needed.
            </li>
            <li>
              Leave requests (including business trips) must be submitted no
              later than the **end of the same month** for the date you wish to
              take leave. For example, if you want to apply for leave on
              **November 12**, you must submit the request by **November 30**.
            </li>
            <li>
              Ensure your leave request is approved before the leave date to
              avoid any misunderstandings.
            </li>
            <li>
              In case of emergencies, contact HR directly and follow up with a
              formal request later.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;
