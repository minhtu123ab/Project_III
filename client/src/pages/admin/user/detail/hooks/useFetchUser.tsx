import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../axios/axiosInstance";
import axios from "axios";
import { message } from "antd";

const useFetchUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState<IDataUser>({
    _id: "",
    username: "",
    role: "",
    base_salary: "",
    phone: "",
    national_id: "",
    gender: "",
    address: "",
    image: "",
    isAdmin: false,
    status: "",
    hire_date: new Date(),
    name: "",
    birth_date: null,
    off_date: null,
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          message.error(err.response.data.message);
        } else {
          message.error("An unexpected error occurred");
        }
        window.location.href = "/login";
      }
    };
    fetchUser();
  }, [id]);
  return user;
};

export default useFetchUser;
