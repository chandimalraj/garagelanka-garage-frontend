import { axiosPrivate } from "./api";

export const getAppoinments = async (startDate, endDate) => {
  const response = await axiosPrivate.get(
    "/api/dashboard/getFilteredBookings?startDate=" +
      startDate +
      "&endDate=" +
      endDate
  );
  return response;
};

export const getAppoinmentsByServiceType = async (startDate, endDate) => {
  const response = await axiosPrivate.get(
    "/api/dashboard/getFilteredBookingsByServiceType?startDate=" +
      startDate +
      "&endDate=" +
      endDate
  );
  return response;
};

export const getNumberOfAppoinments = async (startDate, endDate) => {
  const response = await axiosPrivate.get(
    "/api/dashboard/getNumberOfBookingsByDate?startDate=" +
      startDate +
      "&endDate=" +
      endDate
  );
  return response;
};