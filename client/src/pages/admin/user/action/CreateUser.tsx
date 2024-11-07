import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../../../../axios/axiosInstance";
import axios from "axios";
import ControllerInput from "../../../../components/ControllerInput";
import ControllerSelect from "../../../../components/ControllerSelect";
import data from "./data/dataController.json";

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  username: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone Number is required"),
  national_id: yup.string().required("National ID is required"),
  gender: yup.string().required("Gender is required"),
  base_salary: yup.string().required("Base Salary is required"),
  role: yup.string().required("Role is required"),
  isAdmin: yup.boolean().required("Is Administrator is required"),
});

const dataControllerCreate = data.dataControllerCreate;

const CreateUser = () => {
  const navigate = useNavigate();
  const handleClickCancel = () => {
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
      name: "",
      username: "",
      phone: "",
      national_id: "",
      gender: "",
      base_salary: "",
      role: "",
      isAdmin: false,
    },
  });

  const onSubmit = async (data: IDataCreateUser) => {
    try {
      await axiosInstance.post("/user/create", data);
      message.success("Employee created successfully");
      navigate("/admin/users");
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
    <div className="flex flex-col items-center p-7 w-full mx-auto bg-white rounded-lg ">
      <h1 className="text-3xl font-bold mb-7 text-center border-b border-cyan-500 pb-4 w-full text-cyan-700">
        Add New Employee
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5 w-full"
      >
        {dataControllerCreate.map((item, index) =>
          item.data ? (
            <ControllerSelect
              key={index}
              control={control}
              name={item.name}
              errors={errors}
              labelName={item.labelName}
              required={item.required}
              data={item.data}
            />
          ) : (
            <ControllerInput
              key={index}
              control={control}
              name={item.name}
              errors={errors}
              labelName={item.labelName}
              required={item.required}
              type={item.type}
            />
          )
        )}

        <div className="col-span-2 flex justify-end mt-8">
          <Button
            onClick={handleClickCancel}
            size="large"
            type="primary"
            className="mr-4 border border-gray-400 bg-gray-300 text-gray-700 hover:!bg-gray-400 hover:!text-white"
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="bg-cyan-400 text-white hover:!bg-cyan-500"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
