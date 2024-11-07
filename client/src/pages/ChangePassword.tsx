import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, message } from "antd";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../axios/axiosInstance";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Current Password is required"),
  newPassword: yup.string().required("New Password is required"),
  newPasswordAgain: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const onClickCancel = () => {
    navigate("/admin/users");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    },
  });

  const onSubmit = async (data: IDataChangePassword) => {
    try {
      await axiosInstance.post(
        "http://localhost:8080/api/user/change-password",
        data
      );
      message.success("Password changed successfully");
      navigate("/admin/users");
      reset();
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || "An error occurred");
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 shadow-md rounded-xl border border-gray-200">
      <h1 className="text-cyan-600 text-2xl font-semibold mb-3 text-center border-b-2 border-cyan-100 pb-3">
        Change Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label className="font-semibold block mb-1 text-gray-600">
            Current Password<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <Input.Password
                size="large"
                type="password"
                autoComplete="off"
                className="rounded-md hover:border-cyan-400 focus:border-cyan-500 focus:ring-0"
                {...field}
              />
            )}
          />
          {errors.oldPassword && (
            <p className="text-xs text-red-500">{errors.oldPassword.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold block mb-1 text-gray-600">
            New Password<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Input.Password
                size="large"
                type="password"
                autoComplete="off"
                className="rounded-md hover:border-cyan-400 focus:border-cyan-500 focus:ring-0"
                {...field}
              />
            )}
          />
          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold block mb-1 text-gray-600">
            Confirm Password<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="newPasswordAgain"
            render={({ field }) => (
              <Input.Password
                size="large"
                type="password"
                autoComplete="off"
                className="rounded-md hover:border-cyan-400 focus:border-cyan-500 focus:ring-0"
                {...field}
              />
            )}
          />
          {errors.newPasswordAgain && (
            <p className="text-xs text-red-500">
              {errors.newPasswordAgain.message}
            </p>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            type="primary"
            size="large"
            className="bg-gray-300 text-gray-700 hover:!bg-gray-400 hover:!text-white px-5"
            onClick={onClickCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="bg-cyan-400 text-white hover:!bg-cyan-500 rounded-lg px-5"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
