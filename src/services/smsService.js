import axios, { axiosPrivate } from "../services/api";

export const sendSmsRequest = async (data) => {
  const response = await axiosPrivate.post("/api/sms/smsRequest",data);
  return response;
};