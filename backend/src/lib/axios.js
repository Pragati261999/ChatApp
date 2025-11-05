import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // CRITICAL: Send cookies
});

export default axiosInstance;