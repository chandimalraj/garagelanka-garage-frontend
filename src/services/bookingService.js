import axios, { axiosPrivate } from "../services/api";
import jwtDecode from "jwt-decode";

export const getAllAppoinments = async (start, end, page) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(jwtToken);
  const serviceCenterId = decoded.user.serviceCenter._id;
  const response = await axiosPrivate.get(
    `/api/bookings/bookingsbyServiCecenterIdandDateRange?sc_id=${serviceCenterId}&start_date=${start}&end_date=${end}&limit=5&page=${page}`
  );
  return response;
};

export const filterAppoinmentsByPhone = async (phone, page) => {
  const response = await axiosPrivate.get(
    "/api/bookings/filterBookings?&mobile=" + phone + `&limit=5&page=${page}`
  );
  return response;
};

export const filterAppoinmentsByVehicleNumber = async (number, page) => {
  const response = await axiosPrivate.get(
    "/api/bookings/filterBookings?&vehicleRegNo=" +
      number +
      `&limit=5&page=${page}`
  );
  return response;
};

export const getServiceTypes = async () => {
  const response = await axiosPrivate.get(
    "api/serviceCenters/getservicetypesbyscid"
  );
  console.log(response.data);
  return response;
};

export const getTimeSlots = async (start, end, id) => {
  const response = await axiosPrivate.get(
    "api/bookings/bookedSlotsbyServiceCenterIdandDateRangeServiceTypeId?start_date=" +
      start +
      "&end_date=" +
      end +
      "&servicetypeId=" +
      id
  );
  return response;
};

export const makeAppointment = async (item) => {
  const response = await axiosPrivate.post("/api/bookings/makeabooking", item);
  return response;
};

export const deleteAppointment = async (id) => {
  const response = await axiosPrivate.delete(
    "/api/bookings/deletebooking?booking_id=" + id
  );
  return response;
};
