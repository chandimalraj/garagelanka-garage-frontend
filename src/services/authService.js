import axios, { axiosPrivate } from "../services/api";
import { baseURL } from "../utils/constants/api";

export const userLogin = async (user) => {
  const response = await axios.post("/api/auth", {
    mobile: user.mobile,
    password: user.password,
  });

  return response;
};

export const ownerLogin = async (url, method, data) => {
  const token = localStorage.getItem("jwtToken");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["auth-token"] = `${token}`;
  }

  try {
    const response = await axios({
      method: method,
      url: baseURL + url,
      headers: headers,
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getOtp = async (object) => {
  const response = await axios.post("/api/auth/forgotpasswordmobile", object);
  return response;
};

export const sendOtp = async (object) => {
  const response = await axios.post("/api/auth/resetpasswordmobile", object);
  return response;
};

export const setNewPassword = async (object) => {
  const response = await axiosPrivate.post("/api/auth/newpasswordmobile", object);
  return response;
};
