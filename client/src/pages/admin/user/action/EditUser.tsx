import { Button, Upload, Image, message } from "antd";
import { IoCameraReverseOutline } from "react-icons/io5";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import useFetchUser from "../detail/hooks/useFetchUser";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ControllerInput from "../../../../components/ControllerInput";
import ControllerSelect from "../../../../components/ControllerSelect";
import data from "./data/dataController.json";

const schema = yup.object().shape({
  image: yup.mixed<File | string>(),
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  national_id: yup.string().required("National ID is required"),
  gender: yup.string().required("Gender is required"),
  base_salary: yup.string().required("Base salary is required"),
  role: yup.string().required("Role is required"),
  isAdmin: yup.boolean().required("Is admin is required"),
  status: yup.string().required("Status is required"),
  address: yup.string(),
  birth_date: yup.mixed<Date | string>().nullable(),
});

const dataControllerUpdate = data.dataControllerUpdate;

const EditUser = () => {
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useFetchUser();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: user?.image,
      name: user?.name,
      phone: user?.phone,
      national_id: user?.national_id,
      gender: user?.gender,
      base_salary: user?.base_salary,
      role: user?.role,
      isAdmin: user?.isAdmin,
      status: user?.status,
      address: user?.address || "",
      birth_date: user?.birth_date ? new Date(user.birth_date) : null,
    },
  });

  useEffect(() => {
    if (user) {
      const birthDate = user.birth_date
        ? new Date(user.birth_date).toISOString().split("T")[0]
        : null;

      reset({
        image: user.image,
        name: user.name,
        phone: user.phone,
        national_id: user.national_id,
        gender: user.gender,
        base_salary: user.base_salary,
        role: user.role,
        isAdmin: user.isAdmin,
        status: user.status,
        address: user.address,
        birth_date: birthDate,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: IDataUpdateUser) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("national_id", data.national_id);
      formData.append("gender", data.gender);
      formData.append("base_salary", data.base_salary);
      formData.append("role", data.role);
      formData.append("isAdmin", String(data.isAdmin));
      formData.append("status", data.status);
      formData.append("address", data.address || "");
      formData.append(
        "birth_date",
        data.birth_date instanceof Date ? data.birth_date.toISOString() : ""
      );
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      await axiosInstance.put(`/user/admin/update/${user._id}`, formData);
      message.success("Employee updated successfully");
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        message.error(err.response.data.message);
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const changeImage = (info: UploadChangeParam<UploadFile<File>>) => {
    console.log(info);
    if (info.file && info.file.originFileObj) {
      const file = info.file.originFileObj;
      setValue("image", file, { shouldValidate: true });
      if (file instanceof File) {
        setUrlImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-7 w-full mx-auto bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-7 text-center border-b border-cyan-500 pb-4 w-full text-cyan-700">
        Edit Employee
      </h1>
      <form className="flex w-full gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-[2] grid grid-cols-2 gap-5 w-full">
          {dataControllerUpdate.map((item, index) =>
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
        </div>
        <div className="flex-[1] flex flex-col items-center justify-around">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col items-center gap-2">
                <Image
                  className="border-2 border-cyan-200 rounded-xl overflow-hidden object-cover"
                  src={
                    urlImage
                      ? urlImage
                      : typeof field.value === "string"
                      ? field.value
                      : undefined
                  }
                  width={200}
                  height={200}
                />
                <Upload showUploadList={false} onChange={changeImage}>
                  <Button icon={<IoCameraReverseOutline size={20} />}>
                    Change Image
                  </Button>
                </Upload>
              </div>
            )}
          />
          <div className="flex justify-around w-full">
            <Button
              type="primary"
              size="large"
              className="bg-gray-300 text-gray-700 hover:!bg-gray-400 hover:!text-white px-5"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              className="bg-cyan-400 text-white hover:!bg-cyan-500 rounded-lg px-5"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
