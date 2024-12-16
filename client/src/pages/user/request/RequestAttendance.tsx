import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message, Typography } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ControllerInput from "../../../components/ControllerInput";
import axios from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const schema = yup.object().shape({
  date: yup.mixed<Date | string>().required("Date is required"),
  check_in: yup.string().required("Check-in time is required"),
  check_out: yup.string().required("Check-out time is required"),
  description: yup.string().required("Description is required"),
});

const RequestAttendance = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [searchParams] = useSearchParams();

  const onSubmit = async (data: IDataRequestAttendance) => {
    try {
      data.check_in = data.check_in + ":00";
      data.check_out = data.check_out + ":00";
      data.date = new Date(
        new Date(data.date).setHours(0, 0, 0, 0)
      ).toISOString();
      console.log(data);
      await axiosInstance.post("/request/attendance", data);
      message.success("Attendance request submitted successfully");
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

  useEffect(() => {
    const date = searchParams.get("date");
    if (date) {
      reset({
        date: new Date(date).toISOString().split("T")[0],
        check_in: "",
        check_out: "",
        description: "",
      });
    }
  }, [reset, searchParams]);

  return (
    <div className="p-4 sm:p-6 md:p-8 !pt-4">
      <Typography.Title level={1} className="!text-cyan-500 text-center mb-6">
        Attendance Request
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
        <div className="flex space-x-5">
          <ControllerInput
            control={control}
            errors={errors}
            name="check_in"
            labelName="Check In"
            required
            type="time"
          />
          <ControllerInput
            control={control}
            errors={errors}
            name="check_out"
            labelName="Check Out"
            required
            type="time"
          />
        </div>
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
        <Typography.Title level={3}>
          Attendance Adjustment Regulations
        </Typography.Title>
        <div className="text-lg">
          <ul className="list-disc pl-6">
            <li>
              You can submit an attendance adjustment request a maximum of **3
              times per month**.
            </li>
            <li>
              Attendance adjustment requests must be submitted no later than the
              **end of the same month** for the date you wish to adjust. For
              example, if you want to adjust the attendance for **November 12**,
              you must submit the request by **November 30**.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestAttendance;
