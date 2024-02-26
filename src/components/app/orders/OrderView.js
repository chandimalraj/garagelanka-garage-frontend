import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";
import { updateOrder } from "../../../services/orderService";
import { showToasts } from "../../toast";

export default function OrderView({ orderData, getOrders }) {
  const gridRef = useRef();
  const cellStyle = {
    display: "flex",
    alignItems: "center",
  };

  const [columnDefs] = useState([
    {
      field: "itemName",
      headerName: "Product Name",
      width: 150,

      cellStyle: cellStyle,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: `qty`,
      headerName: "Qty",
      width: 75,
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: "onlinePrice",
      headerName: "Online Price",
      flex: 1,
      cellStyle: cellStyle,
    },
  ]);
  console.log(orderData?.items);
  const items = orderData?.items;

  const [statusList, setStatusList] = useState([
    "Accepted",
    "Rejected",
    "Dispatched",
  ]);
  const [status, setStatus] = useState(null);
  const [orderDataUpdate, setOrderDataUpdate] = useState({});

  const handleChange = (value, target) => {
    setOrderDataUpdate({ ...orderDataUpdate, [target]: value });
  };

  const updateOrders = async () => {
    try {
      const orderId = orderData?._id;
      const subOrderId = orderData?.subOrders?._id;
      const order = {
        ...orderDataUpdate,
        orderTotal: orderData?.subOrders?.total,
        subTotal: orderData?.subOrders?.total - orderDataUpdate?.discount,
      };
      const response = await updateOrder(orderId, subOrderId, order);
      console.log(response);
      if (response.status == 200) {
        showToasts("SUCCESS", "Order has been accepted successfully!");
        getOrders();
        setOrderDataUpdate({
          sellerStatus: "",
          deliveryCost: "",
          discount: "",
          sellerNotes: "",
        });
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "There is an error occured");
    }
  };
  return (
    <Paper sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          paddingX: "20px",
          paddingTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            width: "100px",
          }}
        >
          {orderData?.uniqueId ? orderData?.uniqueId : "Order ID"}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "15px",
            width: "62px",
          }}
        >
          {orderData?.subOrders?.sellerStatus
            ? orderData?.subOrders?.sellerStatus
            : "status"}
        </Typography>
        <Autocomplete
          options={statusList}
          value={orderDataUpdate?.sellerStatus}
          getOptionLabel={(i) => `${i}`}
          onChange={(e, value) => {
            setStatus(value);
            console.log(value);
            handleChange(value, "sellerStatus");
          }}
          sx={{
            width: "150px",

            marginLeft: "20px",
            "& .MuiOutlinedInput-root": {},
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Set Status"
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  fontSize: 15,
                },
              }}
            />
          )}
          fullWidth
          //defaultValue={"by status"}
          disableClearable
        />
      </Box>
      <Grid container>
        <Grid item lg={3}>
          <TextField
            name="deliveryCost"
            id="deliveryCost"
            value={orderDataUpdate?.deliveryCost}
            fullWidth
            disabled={status !== "Accepted"}
            onChange={(e) => handleChange(e.target.value, "deliveryCost")}
            sx={{
              width: "150px",

              marginLeft: "20px",
              "& .MuiInputBase-root": {
                fontSize: 15,
              },
              "& .MuiInputLabel-root": {
                fontSize: 15, // Set the font size for the label
              },
            }}
            size="small"
            variant="outlined"
            label="Delivery Cost"
            type="number"
          />
        </Grid>
        <Grid item lg={3}>
          <TextField
            name="discount"
            id="discount"
            value={orderDataUpdate?.discount}
            fullWidth
            disabled={status !== "Accepted"}
            onChange={(e) => handleChange(e.target.value, "discount")}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 15,
              },
              "& .MuiInputLabel-root": {
                fontSize: 15, // Set the font size for the label
              },
              width: "150px",
              marginLeft: "10px",
            }}
            size="small"
            variant="outlined"
            label="Discount"
            type="number"
          />
        </Grid>
        <Grid item lg={4}>
          <TextField
            name="sellerNotes"
            id="sellerNotes"
            value={orderDataUpdate?.sellerNotes}
            fullWidth
            disabled={status !== "Accepted"}
            onChange={(e) => handleChange(e.target.value, "sellerNotes")}
            sx={{
              width: "180px",
              marginLeft: "10px",
              "& .MuiInputBase-root": {
                fontSize: 15,
              },
              "& .MuiInputLabel-root": {
                fontSize: 15, // Set the font size for the label
              },
            }}
            size="small"
            variant="outlined"
            label="Seller Note"
          />
        </Grid>
        <Grid item lg={2}>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              fontSize: "13px",
            }}
            color="success"
            onClick={updateOrders}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Paper
        sx={{
          margin: "20px",
          padding: "20px",
          backgroundColor: "#F1EFEF",
        }}
      >
        <Grid container>
          <Grid item lg={2}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize:"14px",
                fontWeight:"500"
              }}
            >
              Customer
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"400"
            }}>
              {orderData?.customer?.firstName +
                " " +
                orderData?.customer?.lastName}
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography
             sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"500"
            }}
            >
              Phone No
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"400"
            }}>{orderData?.customer?.contactNo}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography
             sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"500"
            }}
            >
              Address
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"400"
            }}>
              {orderData?.customer?.address?.line1}{" "}
              {orderData?.customer?.address?.line2}{" "}
              {orderData?.customer?.address?.line3}{" "}
              {orderData?.customer?.address?.city}{" "}
              {orderData?.customer?.address?.postalCode}
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography
             sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"500"
            }}
            >
              Email
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography  sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"400"
            }}>{orderData?.customer?.email}</Typography>
          </Grid>
          <Grid item lg={2}>
            <Typography
             sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"500"
            }}
            >
              Total
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography sx={{
              fontFamily: "Roboto",
              fontSize:"14px",
              fontWeight:"400"
            }}>
              {orderData?.subOrders?.total - orderDataUpdate?.discount}
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <div
            style={{ width: "100%", height: "600px", marginTop: "10px" }}
            className="ag-theme-balham"
          >
            <AgGridReact
              ref={gridRef}
              rowData={orderData?.subOrders?.items}
              columnDefs={columnDefs}
              rowSelection={"single"}
              animateRows={true}
              pagination={true}
              //   onSelectionChanged={onSelectionChanged}
              suppressExcelExport={true}
              gridOptions={{ rowHeight: 30 }}
              rowStyle={{
                background: "rgb(245,247,247)",
                fontFamily: "Poppins",
              }}
              suppressCellFocus={true}
            ></AgGridReact>
          </div>
        </Box>
      </Paper>
    </Paper>
  );
}
