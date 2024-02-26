import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchItem from "./SearchItem";
import OrderView from "./OrderView";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  filterOrdersById,
  filterOrdersByPhone,
  filterOrdersByStatus,
  getAllOrders,
} from "../../../services/orderService";

export default function Orders() {
  const [status, setStatus] = useState("");
  const [statusList, setStatusList] = useState([
    "Pending",
    "Accepted",
    "Rejected",
    "Dispatched",
  ]);
  const [orderId, setOrderId] = useState("");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
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

  const setOrder = (item) => {
    setSelectedOrder(item);
    console.log(item);
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
          <Grid item lg={3}>
            <TextField
              id="standard-search"
              label="Search By Order ID"
              variant="standard"
              type="search"
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  fontSize: 15,
                  marginBottom: "10px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: 15, // Set the font size for the label
                },
                width: "100%",
                margin: "9px",
              }}
              onChange={(e) => {
                setOrderId(e.target.value);
                getOrdersById(e.target.value);
              }}
              value={orderId}
              size="small"
            />
          </Grid>

          <Grid item lg={3}>
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
                width: "200px",
                marginTop: "10px",
                marginLeft: "40px",
              }}
              size="small"
              variant="outlined"
              label="Search by phone"
            />
          </Grid>
          <Grid item lg={3}>
            <Autocomplete
              options={statusList}
              value={status}
              getOptionLabel={(i) => `${i}`}
              onChange={(event, value) => {
                setStatus(value);
                getOrdersByStatus(value);
              }}
              sx={{
                width: "230px",
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
          </Grid>
          <Grid item lg={1}>
            <Button
              variant="outlined"
              sx={{
                width: "100px",
                marginTop: "10px",
                marginLeft: "40px",
                fontSize: "13px"
              }}
              color="success"
              onClick={() => {
                setPhone("");
                setOrderId("");
                setStatus("");
                getOrders();
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
