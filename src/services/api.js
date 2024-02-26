import axios from "axios";
import { baseURL } from "../utils/constants/api";

export default axios.create({ baseURL: baseURL });

export const axiosPrivate = axios.create({
  baseURL: baseURL,
});

// Request interceptor for the private Axios instance
axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
   
  if (token) {
    config.headers['auth-token'] = token
    config.headers['Access-Contol-Allow-Origin'] = '*'
  }

  return config;
});
