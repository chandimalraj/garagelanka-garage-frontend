import axios, { axiosPrivate } from "../services/api";

export const getAllServiceTypes = async (id) => {
  const response = await axiosPrivate.get("/api/servicetypes");
  return response;
};

export const getServiceTypesByServiceCenter = async (id) => {
  const response = await axiosPrivate.get(
    "/api/serviceCenters/getservicetypesbyscid"
  );
  return response;
};

export const addServiceTypeToServiceCenter = async (data) => {
  const response = await axiosPrivate.post(
    "/api/serviceCenters/registerservicetype",
    data
  );
  return response;
};

export const updateServiceType = async (data) => {
  const response = await axiosPrivate.put(
    "/api/serviceCenters/updateServiceType",
    data
  );
  return response;
};

export const deleteServiceType = async (id) => {
  const response = await axiosPrivate.delete(
    "/api/serviceCenters/deleteServiceType?id=" + id
  );
  return response;
};
