import { axiosPrivate } from "./api";

export const makeInvoice = async (item) => {
    const response = await axiosPrivate.post("/api/servierecord", item);
    return response;
  };