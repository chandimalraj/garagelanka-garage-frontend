import axios, { axiosPrivate } from "../services/api";

export const addEmployee = async (employee) => {
  const response = await axiosPrivate.post(
    "/api/employees/registeremployee",
    employee
  );
  return response;
};

export const editEmployee = async (employee) => {
  const response = await axiosPrivate.post(
    "/api/employees/editemployee",
    employee
  );
  return response;
};

export const getEmployees = async () => {
  const response = await axiosPrivate.get("/api/employees/getemployees");
  return response;
};

export const deleteEmployeeById = async (id) => {
  const response = await axiosPrivate.delete(`/api/employees/deleteemployee?id=` + id);
  return response;
}

export const updateEmployeePassword = async (data) => {
  const response = await axiosPrivate.patch(
    "/api/employees/updatePassword",
    data
  );
  return response;
};