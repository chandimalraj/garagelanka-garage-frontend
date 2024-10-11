import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import OrderView from "./OrderView";
import {
  filterOrdersById,
  filterOrdersByPhone,
  filterOrdersByStatus,
  getAllOrders,
  getOrdersByDate,
} from "../../../services/orderService";
import { FieldWrapper } from "../employees/employeeForm/EmployeeForm";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Orders() {
  const getOneWeekBefore = () => {
    const today = new Date(); // Current date
    const oneWeekBefore = new Date(today); // Create a copy of today's date
    oneWeekBefore.setDate(today.getDate() - 7); // Subtract 7 days
    return oneWeekBefore; // Return the date one Week before today
  };

  const [status, setStatus] = useState("");
  const [statusList, setStatusList] = useState([
    "Pending",
    "Accepted",
    "Rejected",
    "Dispatched",
  ]);
  const [orderId, setOrderId] = useState("");
  const [dateRange, setDateRange] = useState({
    from: getOneWeekBefore(),
    to: new Date(),
  });
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersByPhone = async (mobile) => {
    try {
      const response = await filterOrdersByPhone(mobile);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersByStatus = async (status) => {
    try {
      const response = await filterOrdersByStatus(status);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersById = async (id) => {
    try {
      const response = await filterOrdersById(id);
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrdersByDateRange = async (id) => {
    try {
      const response = await getOrdersByDate(dateRange?.from , dateRange?.to)
      setOrders(response?.data?.orders);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setOrder = (item) => {
    setSelectedOrder(item);
    console.log(item);
  };

  const handleChange = (value, target) => {
    setDateRange((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const resetFunction = () => {
    setPhone("");
    setOrderId("");
    setStatus("");
    getOrders();
    handleChange(getOneWeekBefore(), "from");
    handleChange(new Date(), "to");
  };

  return (
    <Box
      sx={{
        paddingX: 5,
        paddingTop: 10,
        width: "100%",
        fontFamily: "Poppins",
        overflowY: "scroll",
      }}
    >
      <Paper
        elevation={2}
        style={{
          borderRadius: 5,
          padding: 5,
          marginBottom: "20px",
          height: "1000px",
        }}
      >
        <Grid container>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                id="standard-search"
                label="Search by order id"
                variant="outlined"
                type="search"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: 15,
                    marginBottom: "10px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: 15, // Set the font size for the label
                  },
                  margin: "9px",
                }}
                onChange={(e) => {
                  setOrderId(e.target.value);
                  getOrdersById(e.target.value);
                }}
                value={orderId}
                size="small"
                fullWidth
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                name="phone"
                id="phone"
                value={phone}
                fullWidth
                onChange={(e) => {
                  setPhone(e.target.value);
                  getOrdersByPhone(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: 15,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: 15, // Set the font size for the label
                  },
                  marginTop: "10px",
                }}
                size="small"
                variant="outlined"
                label="Search by phone"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <Autocomplete
                options={statusList}
                value={status}
                getOptionLabel={(i) => `${i}`}
                onChange={(event, value) => {
                  setStatus(value);
                  getOrdersByStatus(value);
                }}
                sx={{
                  marginTop: "10px",
                  "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
                    fontSize: 15, // Set the font size for the dropdown items
                  },
                }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="search by status"
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        fontSize: 15,
                      },
                    }}
                  />
                )}
                fullWidth
                defaultValue={"by status"}
                disableClearable
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  value={dayjs(dateRange?.from)}
                  onChange={(e) => {
                    console.log(dayjs(e));
                    handleChange(dayjs(e).format("YYYY-MM-DD"), "from");
                  }}
                  sx={{
                    width: "100%",
                    marginTop: "9px",
                    ".MuiInputBase-root": {},
                    ".MuiInputBase-input": {
                      height: "inherit", // Apply height to input
                      padding: "10px", // Adjust padding to fit the height
                    },
                  }}
                  defaultValue={dayjs(new Date())}
                />
              </LocalizationProvider>
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  value={dayjs(dateRange?.to)}
                  onChange={(e) => {
                    console.log(dayjs(e));
                    handleChange(dayjs(e).format("YYYY-MM-DD"), "to");
                  }}
                  sx={{
                    width: "100%",
                    marginTop: "9px",
                    ".MuiInputBase-root": {},
                    ".MuiInputBase-input": {
                      height: "inherit", // Apply height to input
                      padding: "10px", // Adjust padding to fit the height
                    },
                  }}
                  defaultValue={dayjs(new Date())}
                />
              </LocalizationProvider>
            </FieldWrapper>
          </Grid>
          <Grid item lg={1}>
            <Button
              variant="contained"
              sx={{
                width: "100px",
                marginTop: "10px",
                marginLeft: "40px",
                fontSize: "13px",
              }}
              color="warning"
              onClick={() => {
                resetFunction();
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item lg={4} sx={{ paddingLeft: "5px" }}>
            <Paper
              sx={{
                height: "800px",
                width: "100%",
                overflowY: "scroll",
                paddingTop: "20px",
              }}
            >
              {orders.length > 0 &&
                orders.map((item, index) => (
                  <SearchItem
                    setOrder={() => setOrder(item)}
                    name={
                      item.customer?.firstName + " " + item.customer?.lastName
                    }
                    price={item?.subOrders?.total}
                    status={item?.subOrders?.sellerStatus}
                    id={item.uniqueId}
                  />
                ))}
            </Paper>
          </Grid>
          <Grid item lg={8}>
            <Paper sx={{ height: "800px", width: "100%", overflowY: "scroll" }}>
              <OrderView orderData={selectedOrder} getOrders={getOrders} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
