import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ListOfItems from "./ListOfItems/ListOfItems";
import { getServiceTypes } from "../../../services/bookingService";
import ListOfServices from "./ListOfServices/ListOfServices";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  getPartDetailsByBarcode,
  makeInvoice,
} from "../../../services/invoiceService";
import { getServiceCenterId } from "../../../hooks/authentication";
import { showToasts } from "../../toast";

export default function Invoice() {
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [itemDetails, setItemDetails] = useState({
    itemName: "",
    brand: "",
    itemCode: "",
    barcode: "",
    qnt: 0,
    unit: "",
    unitPrice: 0,
    desc: "",
    total: 0,
    unitDiscount: 0,
  });
  const [serviceDetails, setServiceDetails] = useState({
    serviceTypeID: "",
    serviceTpyeName: "",
    technician: "",
    serviceCost: "",
    serviceDiscount: 0,
    total: 0,
  });
  const [serviceList, setServiceList] = useState([]);

  const [itemList, setItemList] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState({
    serviceTypeID: "",
    serviceTypeName: "",
  });

  useEffect(() => {
    getServiceTypesForServiceCenter();
  }, []);

  const getServiceTypesForServiceCenter = async () => {
    try {
      const response = await getServiceTypes();
      setServiceTypes(response.data.servicesOffered);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvoice = (target, value) => {
    setInvoiceDetails({ ...invoiceDetails, [target]: value });
  };
  const handleVehicle = (target, value) => {
    setVehicleDetails({ ...vehicleDetails, [target]: value });
  };
  const handleItem = (target, value) => {
    //setItemDetails({ ...itemDetails, [target]: value });
    setItemDetails((prevItemDetails) => ({
      ...prevItemDetails,
      [target]: value,
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Prevent the default form submission if the TextField is inside a form
      event.preventDefault();
      // Execute your function here
      handleEnterPress();
    }
  };

  const handleEnterPress = async () => {
    console.log("Enter key pressed, value:");

    try {
      const response = await getPartDetailsByBarcode(itemDetails?.barcode);
      console.log(response);
      if (response.data == "") {
        showToasts("WARNING", "Invalid Barcode Number!");
      }
      if (response.status == 200 && response.data != "") {
        showToasts("SUCCESS", "Part Details Fetched!");
        setItemDetails({
          ...itemDetails,
          itemName: response.data.itemName,
          brand: response.data.brand,
          unitPrice: response.data.sellingPrice,
          itemCode: response.data.itemId,
        });
      }
    } catch (error) {
      console.log(error);
      showToasts("Error", "Error Occured");
    }
    // Add your logic here
  };

  const handleService = (target, value) => {
    setServiceDetails((prevItemDetails) => ({
      ...prevItemDetails,
      [target]: value,
    }));
  };

  const addItem = (item) => {
    let list = [...itemList, item];

    const modifiedItems = list.map((item, index) => {
      return {
        ...item,
        ["id"]: index,
      };
    });
    setItemList(modifiedItems);
    setItemDetails({
      itemName: "",
      brand: "",
      itemCode: "",
      barcode: "",
      qnt: 0,
      unit: "",
      unitPrice: 0,
      desc: "",
      total: 0,
      unitDiscount: 0,
    });
    console.log(item);
  };

  const itemTotal = (target, value) => {
    if (target == "unitPrice") {
      const unitPrice = parseInt(itemDetails.unitPrice, 10);
      const unitDiscount = parseInt(itemDetails?.unitDiscount, 10);
      const qnt = parseInt(itemDetails?.qnt, 10);
      const total = unitPrice * qnt - unitDiscount * qnt;
      console.log(itemDetails?.unitDiscount);
      setItemDetails({ ...itemDetails, ["total"]: total });
    }
    if (target == "unitDiscount") {
      const unitPrice = parseInt(itemDetails?.unitPrice, 10);
      const unitDiscount = parseInt(value, 10);
      const qnt = parseInt(itemDetails?.qnt, 10);
      const total = unitPrice * qnt - unitDiscount * qnt;
      console.log(total);
      setItemDetails({ ...itemDetails, ["total"]: total });
    }
    if (target == "qnt") {
      const unitPrice = parseInt(itemDetails?.unitPrice, 10);
      const unitDiscount = parseInt(itemDetails?.unitDiscount, 10);
      const qnt = parseInt(value, 10);
      const total = unitPrice * qnt - unitDiscount * qnt;
      console.log(unitDiscount * qnt);
      setItemDetails({ ...itemDetails, total: total });
    }
  };

  const enableAddItem = () => {
    if (
      itemDetails?.barcode !== "" &&
      itemDetails?.itemCode !== "" &&
      itemDetails?.itemName !== "" &&
      itemDetails?.brand !== "" &&
      itemDetails?.qnt !== 0 &&
      itemDetails?.unitPrice !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const addService = (service) => {
    let list = [...serviceList, service];

    const modifiedServiceList = list.map((item, index) => {
      return {
        ...item,
        ["id"]: index,
      };
    });
    setServiceList(modifiedServiceList);
    setServiceDetails({
      serviceTypeID: "",
      serviceTypeName: "",
      technician: "",
      serviceCost: 0,
      serviceDiscount: 0,
      total: 0,
    });
    console.log(service);
    setSelectedServiceType({
      serviceTypeID: "",
      serviceTypeName: "",
    });
  };

  const enableAddService = () => {
    if (
      serviceDetails?.serviceTypeID !== "" &&
      serviceDetails?.serviceTpyeName !== "" &&
      serviceDetails?.technician !== "" &&
      serviceDetails?.serviceCost !== "" &&
      // serviceDetails?.serviceDiscount !== 0 &&
      serviceDetails?.total !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const serviceTotal = (target, value) => {
    if (target == "serviceCost") {
      const serviceCost = parseInt(value, 10);
      const serviceDiscount = parseInt(serviceDetails?.serviceDiscount, 10);
      const total = serviceCost - serviceDiscount;
      console.log(total);
      setServiceDetails({ ...serviceDetails, ["total"]: total });
    }
    if (target == "serviceDiscount") {
      const serviceCost = parseInt(serviceDetails?.serviceCost, 10);
      const serviceDiscount = parseInt(value, 10);
      const total = serviceCost - serviceDiscount;
      console.log(total);
      setServiceDetails({ ...serviceDetails, ["total"]: total });
    }
  };

  const handleDelete = (target, id) => {
    if (target == "item") {
      const filteredItems = itemList.filter((item) => {
        return item?.id !== id;
      });
      setItemList(filteredItems);
    }
    if (target == "service") {
      const filteredServices = serviceList.filter((item) => {
        return item?.id !== id;
      });
      setServiceList(filteredServices);
    }
  };

  const getTotal = () => {
    const allItems = itemList.concat(serviceList);
    let total = 0;
    allItems.forEach((item) => {
      total = item?.total + total;
    });
    console.log("getTotal");
    return parseFloat(total).toFixed(2);
  };

  const createInvoice = async () => {
    const totalAmount = parseFloat(getTotal()).toFixed(2);
    const finalAmount = parseFloat(getTotal()).toFixed(2);
    const invoice = {
      ...invoiceDetails,
      bookingRef: "",
      serviceCenterId: getServiceCenterId(),
      billingDate: new Date().toString(),
      registeredCustomer: true,

      itemList: itemList,
      serviceList: serviceList,
      vehicle: "",

      category: "SERVICE_BILL",
      description: "Added engine oil or any other coment",
      discountCode: "",
      totalAmount: totalAmount,
      discount: 0,
      finalAmount: finalAmount,
      customer: {
        name: invoiceDetails?.customerName,
        email: invoiceDetails?.email,
        mobile: invoiceDetails?.mobile,
      },
    };
    console.log(invoice);
    try {
      const response = await makeInvoice(invoice);
      console.log(response);
      if (response.status === 200) {
        showToasts("SUCCESS", "Service Bill Added!");
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Error Occured !");
    }
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
          height: "auto",
        }}
      >
        <Grid container>
          <Grid
            item
            lg={8}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingInline: "5px",
            }}
          >
            <Title>Customer Details</Title>
            <Grid container spacing={1}>
              <Grid item lg={3}>
                <TextField
                  name="mobile"
                  id="mobile"
                  value={invoiceDetails?.mobile}
                  fullWidth
                  onChange={(e) => {
                    handleInvoice("mobile", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Contact Num"
                />
              </Grid>
              <Grid item lg={4}>
                <TextField
                  name="phone"
                  id="phone"
                  value={invoiceDetails?.customerName}
                  fullWidth
                  onChange={(e) => {
                    handleInvoice("customerName", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Customer Name"
                />
              </Grid>
              <Grid item lg={4}>
                <TextField
                  name="email"
                  id="email"
                  value={invoiceDetails?.email}
                  fullWidth
                  onChange={(e) => {
                    handleInvoice("email", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Email"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            lg={4}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingInline: "5px",
            }}
          >
            <Title>Vehicle Details</Title>
            <Grid container spacing={1}>
              <Grid item lg={6}>
                <TextField
                  name="vehicleNum"
                  id="vehicleNum"
                  value={invoiceDetails?.vehicleRegNo}
                  fullWidth
                  onChange={(e) => {
                    handleInvoice("vehicleRegNo", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Vehicle Number"
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  name="mileage"
                  id="mileage"
                  value={invoiceDetails?.odoMeter}
                  fullWidth
                  onChange={(e) => {
                    handleInvoice("odoMeter", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Mileage"
                  type="number"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={8}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingInline: "5px",
            }}
          >
            <Title>Item Details</Title>
            <Grid container spacing={1}>
              <Grid item lg={3}>
                <TextField
                  name="barCode"
                  id="barCode"
                  value={itemDetails?.barcode}
                  fullWidth
                  onChange={(e) => {
                    handleItem("barcode", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Barcode"
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="itemNum"
                  id="itemNum"
                  value={itemDetails?.itemCode}
                  fullWidth
                  onChange={(e) => {
                    handleItem("itemCode", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Item Code"
                  disabled
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="itemName"
                  id="itemName"
                  value={itemDetails?.itemName}
                  fullWidth
                  onChange={(e) => {
                    handleItem("itemName", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Item Name"
                  disabled
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="brand"
                  id="brand"
                  value={itemDetails?.brand}
                  fullWidth
                  onChange={(e) => {
                    handleItem("brand", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Brand"
                  disabled
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="price"
                  id="price"
                  value={itemDetails?.unitPrice}
                  fullWidth
                  onChange={(e) => {
                    itemTotal("unitPrice", e.target.value);
                    handleItem("unitPrice", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Price"
                  type="number"
                  defaultValue={0}
                  disabled
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="discount"
                  id="discount"
                  value={itemDetails?.unitDiscount}
                  fullWidth
                  onChange={(e) => {
                    itemTotal("unitDiscount", e.target.value);
                    handleItem("unitDiscount", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Unit Discount"
                  type="number"
                  defaultValue={0}
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="qty"
                  id="qty"
                  value={itemDetails?.qnt}
                  fullWidth
                  onChange={(e) => {
                    itemTotal("qnt", e.target.value);
                    handleItem("qnt", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Qty"
                  type="number"
                  defaultValue={0}
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="total"
                  id="total"
                  value={itemDetails?.total}
                  fullWidth
                  onChange={(e) => {
                    handleItem("total", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Total"
                  type="number"
                  defaultValue={0}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <Button
              style={{
                marginTop: "131px",
                marginLeft: "20px",
                width: "140px",
              }}
              color="success"
              variant="contained"
              startIcon={<AddCircleRoundedIcon />}
              onClick={() => {
                addItem(itemDetails);
              }}
              disabled={enableAddItem()}
            >
              Add Item
            </Button>
          </Grid>

          <Grid
            item
            lg={8}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <ListOfItems data={itemList} handleDelete={handleDelete} />
          </Grid>
          <Grid
            item
            lg={10}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingInline: "5px",
            }}
          >
            <Title>Service Details</Title>
            <Grid container spacing={1}>
              <Grid item lg={3}>
                <Autocomplete
                  options={serviceTypes}
                  value={selectedServiceType}
                  getOptionLabel={(i) => `${i.serviceTypeName}`}
                  onChange={(event, value) => {
                    handleService("serviceTypeID", value?.serviceTypeId);
                    handleService("serviceTpyeName", value?.serviceTypeName);
                    setSelectedServiceType(value);
                    console.log(value);
                  }}
                  sx={{
                    "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
                      fontSize: 15, // Set the font size for the dropdown items
                    },
                    marginTop: "10px",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      //size="small"

                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          fontSize: 15,
                        },
                      }}
                      label="Select Service Type"
                    />
                  )}
                  fullWidth
                  disableClearable
                />
              </Grid>
              <Grid item lg={3}>
                <TextField
                  name="technician"
                  id="technician"
                  value={serviceDetails?.technician}
                  fullWidth
                  onChange={(e) => {
                    handleService("technician", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Technician"
                />
              </Grid>
              <Grid item lg={2}>
                <TextField
                  name="serviceCost"
                  id="serviceCost"
                  value={serviceDetails?.serviceCost}
                  fullWidth
                  onChange={(e) => {
                    serviceTotal("serviceCost", e.target.value);
                    handleService("serviceCost", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Service Cost"
                  type="number"
                  defaultValue={0}
                />
              </Grid>
              <Grid item lg={2}>
                <TextField
                  name="serviceDiscount"
                  id="serviceDiscount"
                  value={serviceDetails?.serviceDiscount}
                  fullWidth
                  onChange={(e) => {
                    serviceTotal("serviceDiscount", e.target.value);
                    handleService("serviceDiscount", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Discount"
                  type="number"
                  defaultValue={0}
                />
              </Grid>
              <Grid item lg={2}>
                <TextField
                  name="total"
                  id="total"
                  value={serviceDetails?.total}
                  fullWidth
                  onChange={(e) => {
                    //handleService("total", e.target.value);
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: 15,
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: 15, // Set the font size for the label
                    },
                    // width: "200px",
                    marginTop: "10px",
                  }}
                  variant="outlined"
                  label="Total"
                  type="number"
                  defaultValue={0}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={2}>
            <Button
              style={{
                marginTop: "59px",
                marginLeft: "20px",
              }}
              color="success"
              variant="contained"
              startIcon={<AddCircleRoundedIcon />}
              disabled={!enableAddService()}
              onClick={() => {
                addService(serviceDetails);
              }}
            >
              Add Service
            </Button>
          </Grid>
          <Grid
            item
            lg={8}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <ListOfServices data={serviceList} handleDelete={handleDelete} />
          </Grid>
          <Grid item lg={8} sx={{ display: "flex" }}>
            <Title
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              Total
            </Title>
            <Typography
              style={{
                fontFamily: "Poppins",
                marginTop: "10px",
                marginLeft: "30px",
                width: "150px",
              }}
            >
              {getTotal()}
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Button
              style={{
                marginBottom: "59px",
                marginLeft: "20px",
              }}
              color="success"
              variant="contained"
              startIcon={<EditNoteIcon />}
              disabled={itemList.length === 0 && serviceList.length === 0}
              onClick={() => {
                createInvoice();
              }}
            >
              Create Invoice
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

const Title = styled.div`
  width: 100%;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
`;
