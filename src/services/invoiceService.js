import { axiosPrivate } from "./api";

export const makeInvoice = async (item) => {
  const response = await axiosPrivate.post("/api/servicebill/addinvoice", item);
  return response;
};

export const getInvoices = async (page, limit) => {
  const response = await axiosPrivate.get(
    "/api/servicebill?page=" + page + "&limit=" + limit
  );
  return response;
};

export const getPartDetailsByBarcode = async (barcode) => {
  const response = await axiosPrivate.get(
    "/api/parts/getpartfrombarcode?barcode=" + barcode
  );
  return response;
};

export const getInvoiceByInvoiceNum = async (invoiceNum) => {
  const response = await axiosPrivate.get(
    "/api/servicebill/getinvoicebuinvoicenumber?invoiceNo=" + invoiceNum
  );
  return response;
};

export const getInvoiceByDateRange = async (from, to) => {
  const response = await axiosPrivate.get(
    "/api/servicebill/date?from=" + from + "&to=" + to
  );
  return response;
};
