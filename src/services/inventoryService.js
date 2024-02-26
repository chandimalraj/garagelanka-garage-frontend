import axios, { axiosPrivate } from "../services/api";

export const getAllCategories = async () => {
  const response = await axiosPrivate.get("api/parts/get-all-categories");
  return response;
};

export const getAllPartByCategoryId = async (typeId) => {
  const response = await axiosPrivate.get(
    `/api/parts/getPartsOfCategory/${typeId}`
  );
  return response;
};

export const checkBarcodeExist = async (barcodeNumber) => {
  const response = await axiosPrivate.get(
    `/api/inventory/check-barcode?barcode=${barcodeNumber}`
  );
  return response;
};

export const getVehicleMakes = async () => {
  const response = await axiosPrivate.get("/api/make");
  return response;
};

export const getVehicleModels = async (makeCategoryId) => {
  const response = await axiosPrivate.get(
    `/api/vehiclemodel/modelBymakeId?make_id=${makeCategoryId}`
  );
  return response;
};

export const addPart = async (item) => {
  const response = await axiosPrivate.post("/api/parts/add-part", item);
  return response;
};

export const editPart = async (item) => {
  const response = await axiosPrivate.patch("/api/parts/edit-part", item);
  return response;
};

export const removePart = async (barcodeNumber) => {
  const response = await axiosPrivate.delete(`/api/parts/remove-part/${barcodeNumber}`);
  return response;
};


