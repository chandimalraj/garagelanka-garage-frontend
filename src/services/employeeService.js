import axios, { axiosPrivate } from "../services/api";


export const addEmployee = async (employee) => {
    const response = await axiosPrivate.post("/api/employees/registeremployee", employee);
    return response;
  };