import { axiosPrivate } from "../services/api";

export const addCustomer = async (customer) => {
  const response = await axiosPrivate.post(
    "/api/customer/addcustomer",
    customer
  );
  return response;
};

export const updateCustomer = async (customer) => {
  const response = await axiosPrivate.put(
    "/api/customer/updatecustomer",
    customer
  );
  return response;
};

export const getCustomers = async () => {
  const response = await axiosPrivate.get("/api/customer/getcustomers");
  return response;
};

export const deleteCustomerById = async (id) => {
  const response = await axiosPrivate.delete(
    `/api/customer/deletecustomer?id=` + id
  );
  return response;
};

export const getCustomersByVehicle = async (make, model) => {
  const response = await axiosPrivate.get(
    "/api/customer/getcustomersByVehicle?make_id=" + make + "&model_id=" + model
  );
  return response;
};

export const getCustomerByMobile = async (mobile) => {
  const response = await axiosPrivate.get(
    "/api/customer/getcustomersByMobile?mobile=" + mobile 
  );
  return response;
};