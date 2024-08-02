import { axiosPrivate } from "./api";

export const createEexpense = async (item) => {
    const response = await axiosPrivate.post("/api/expense/add", item);
    return response;
  };

  export const getExpenses = async () => {
    const response = await axiosPrivate.get("/api/expense/getAllExpenses");
    return response;
  };
  
  export const updateExpense = async (expense) => {
    const response = await axiosPrivate.put("/api/expense/updateExpense", expense);
    return response;
  };
  
  export const deleteExpenseById = async (id) => {
    const response = await axiosPrivate.delete("/api/expense/deleteExpense?id=" + id);
    return response;
  };