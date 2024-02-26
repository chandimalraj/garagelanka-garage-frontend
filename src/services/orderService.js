import axios, { axiosPrivate } from "../services/api";

export const getAllOrders = async (id) => {
  const response = await axiosPrivate.get("/api/orders?status=Pending");
  return response;
};

export const updateOrder = async (orderId,subOrderId,data) => {
  const response = await axiosPrivate.patch(`/api/orders/updateorder?orderId=${orderId}&subOrderId=${subOrderId}`,data);
  return response;
};

export const getAllRejectedOrders = async (id) => {
  const response = await axiosPrivate.get("/api/orders?status=Reject");
  return response;
};

export const getAllApprovedOrders = async (id) => {
  const response = await axiosPrivate.get("/api/orders?status=Approved");
  return response;
};

export const filterOrdersByPhone = async (mobile) => {
  const response = await axiosPrivate.get("/api/orders/filter?mobile=" + mobile);
  return response;
};

export const filterOrdersByStatus= async (status) => {
  const response = await axiosPrivate.get("/api/orders?status=" + status);
  return response;
};

export const filterOrdersById= async (id) => {
  const response = await axiosPrivate.get("/api/orders/suborder/" + id);
  return response;
};
