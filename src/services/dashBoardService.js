import { axiosPrivate } from "./api";

export const getAppoinments = async (startDate, endDate) => {
  const response = await axiosPrivate.get(
    "/api/bookings/getFilteredBookings?startDate=" +
      startDate +
      "&endDate=" +
      endDate
  );
  return response;
};
