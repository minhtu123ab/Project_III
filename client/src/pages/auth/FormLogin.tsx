import { Button, Input, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const schema = yup.object().shape({
  username: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password minimum 6 characters"),
});

const FormLogin: React.FC<IFormLoginProps> = ({ handleClickForgot }) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: IDataLogin) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      message.success("Logged in successfully");
      const decode: IDecodeToken = jwtDecode(response.data.token);
      const { isAdmin } = decode;
      isAdmin
        ? navigate("/admin/dashboard")
        : navigate("/user/attendance/check");
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
    <div className="flex-[2] h-full bg-white flex items-center justify-center flex-col gap-3">
      <img className="w-16 h-auto" src="/logo.svg" alt="logo" />
      <h1 className="font-mono font-bold text-4xl">Login</h1>
      <div className="w-2/3 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="font-mono" htmlFor="email">
                  Username<span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input size="large" id="username" type="email" {...field} />
                  )}
                />
                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="font-mono" htmlFor="password">
                  Password<span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input.Password
                      size="large"
                      id="password"
                      type="password"
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-end font-mono text-cyan-700">
              <span className="cursor-pointer" onClick={handleClickForgot}>
                Forgot Password
              </span>
            </p>
          </div>
          <Button
            className=" bg-cyan-400 font-mono hover:!bg-cyan-500 font-bold text-xl py-5"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
