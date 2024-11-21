import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptor cho request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    window.location.href = "/login";
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
