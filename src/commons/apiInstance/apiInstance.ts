import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://223.130.161.221/api/v1",
});

apiInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiInstance;
