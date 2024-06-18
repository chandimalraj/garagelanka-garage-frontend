import { axiosPrivate } from "./api";

export const makeInvoice = async (item) => {
    const response = await axiosPrivate.post("/api/servicebill/addinvoice", item);
    return response;
  };

  export const getInvoices = async (page,limit) => {
    const response = await axiosPrivate.get("/api/servicebill?page="+page+ "&limit=" + limit);
    return response;
  };  