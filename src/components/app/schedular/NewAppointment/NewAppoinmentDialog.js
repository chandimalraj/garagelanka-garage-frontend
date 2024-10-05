import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TimeSlot from "./TimeSlot";
import {
  getServiceTypes,
  getTimeSlots,
  makeAppointment,
} from "../../../../services/bookingService";
import { showToasts } from "../../../toast";

export default function NewAppoinment({ open, handleClose, confirmAction }) {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [date, setDate] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [next, setNext] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [vehicleRegNum, setVehicleRegNum] = useState("");
  const [description, setDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [vehicleModelName, setVehicleModelName] = useState("");

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

  const getAvailableTimeSlots = async (date, id) => {
    // Set the time to 00:00:00 (midnight)
    const midnightDate = date;
    midnightDate.setHours(0, 0, 0, 0);

    // Set the time to 23:59:59 (end of the day)
    const endOfDayDate = date;
    endOfDayDate.setHours(23, 59, 59, 999);

    try {
      const response = await getTimeSlots(midnightDate, endOfDayDate, id);
      setTimeSlots(response.data.timeSlots);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const selectTimeSlot = (item) => {
    if (item.availability) {
      setSelectedTimeSlot(item);
      console.log(item);
    } else {
      setSelectedTimeSlot(null);
    }
  };

  const getLocalTime = (dateString) => {
    const date = new Date(dateString);
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return timeString;
  };

  const submitAppointment = async () => {
    const appoinment = {
      coustomerFirstName: customerName,
      mobile: mobile,
      serviceTypeId: selectedServiceType.serviceTypeId,
      colorCode: selectedServiceType.colorCode,
      serviceType: selectedServiceType.serviceTypeName,
      vehicleRegNo: vehicleRegNum,
      vehicleModelName: vehicleModelName,
      startDate: new Date(selectedTimeSlot.from).toString(),
      endDate: new Date(selectedTimeSlot.to).toString(),
      description: description,
    };

    try {
      const response = await makeAppointment(appoinment);
      console.log(response);
      if (response.status === 200) {
        showToasts("SUCCESS", "Appointment Created Successfully");
      }
      handleClose();
      confirmAction(new Date(), 1);
      resetProperties();
    } catch (error) {
      console.log(error);
    }
  };

  const resetProperties = () => {
    setSelectedServiceType(null);
    setTimeSlots([]);
    setSelectedTimeSlot(null);
    setCustomerName("");
    setVehicleRegNum("");
    setDescription("");
    setMobile("");
    setVehicleModelName("");
    setDate(null);
    setNext(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          maxWidth: "1000px",
        },
      }}
    >
      <Grid
        container
        sx={{
          borderRadius: "5px",
          padding: "15px",
          width: "600px",
        }}
        spacing={1}
      >
        <Grid item lg={6} sx={{}}>
          <Autocomplete
            options={serviceTypes}
            value={selectedServiceType}
            getOptionLabel={(i) => `${i.serviceTypeName}`}
            onChange={(event, value) => {
              setSelectedServiceType(value);
            }}
            sx={{
              "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
                fontSize: 15, // Set the font size for the dropdown items
              },
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
        <Grid item lg={6} sx={{ display: "flex" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              disabled={selectedServiceType == null}
              onChange={(e) => {
                setDate(e);
                getAvailableTimeSlots(
                  new Date(e),
                  selectedServiceType.serviceTypeId
                );
              }}
              sx={{
                width: "100%",
              }}
            />
          </LocalizationProvider>
        </Grid>
        {next == true && (
          <Grid item lg={3}>
            <TextField
              name="from"
              id="from"
              value={getLocalTime(selectedTimeSlot?.from)}
              fullWidth
              onChange={(e) => {}}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: 15,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 15, // Set the font size for the label
                },
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
                  {
                    " -webkit-text-fill-color": "rgba(4,0,0)", // Dark text color for disabled label
                  },
                marginTop: "10px",
              }}
              label="From"
              variant="outlined"
              disabled
            />
          </Grid>
        )}
        {next == true && (
          <Grid item lg={3}>
            <TextField
              name="to"
              id="to"
              value={getLocalTime(selectedTimeSlot?.to)}
              fullWidth
              onChange={(e) => {}}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: 15,
                },
                "& .MuiInputLabel-root": {
                  fontSize: 15, // Set the font size for the label
                },
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
                  {
                    " -webkit-text-fill-color": "rgba(4,0,0)", // Dark text color for disabled label
                  },
                marginTop: "10px",
              }}
              label="To"
              variant="outlined"
              disabled
            />
          </Grid>
        )}
        {next == true && (
          <Grid item lg={6}>
            <TextField
              name="customerName"
              id="customerName"
              value={customerName}
              fullWidth
              onChange={(e) => {
                setCustomerName(e.target.value);
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
              label="Enter Customer Name"
              variant="outlined"
            />
          </Grid>
        )}
        {next == true && (
          <Grid item lg={6}>
            <TextField
              name="mobile"
              id="mobile"
              value={mobile}
              fullWidth
              onChange={(e) => {
                setMobile(e.target.value);
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
              label="Enter Contact Number"
              variant="outlined"
            />
          </Grid>
        )}
        {next == true && (
          <Grid item lg={6}>
            <TextField
              name="vehicleRegNum"
              id="vehicleRegNum"
              value={vehicleRegNum}
              fullWidth
              onChange={(e) => {
                setVehicleRegNum(e.target.value);
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
              label="Vehicle Reg Num Ex: CAB-5412"
              variant="outlined"
            />
          </Grid>
        )}
        {next == true && (
          <Grid item lg={6}>
            <TextField
              name="vehicleModelName"
              id="vehicleModelName"
              value={vehicleModelName}
              fullWidth
              onChange={(e) => {
                setVehicleModelName(e.target.value);
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
              label="Vehicle Model"
              variant="outlined"
            />
          </Grid>
        )}
        {next == true && (
          <Grid item lg={6}>
            <TextField
              name="description"
              id="description"
              value={description}
              fullWidth
              onChange={(e) => {
                setDescription(e.target.value);
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
              label="Description"
              variant="outlined"
            />
          </Grid>
        )}
      </Grid>
      {next == false && (
        <Grid
          container
          sx={{
            borderRadius: "5px",
            padding: "15px",
            width: "600px",
            maxHeight: "500px",
            overflowY: "scroll",
          }}
          spacing={1}
        >
          {timeSlots.length > 0 &&
            timeSlots.map((item, index) => (
              <Grid item lg={4} sx={{ display: "flex" }}>
                <TimeSlot
                  item={item}
                  selectTimeSlot={selectTimeSlot}
                  selected={selectedTimeSlot}
                />
              </Grid>
            ))}
        </Grid>
      )}
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            resetProperties();
          }}
          autoFocus
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "#e74c3c", // Change the background color on hover
              // Add more hover-specific styles if needed
            },
          }}
          variant="contained"
        >
          Cancel
        </Button>
        {next == false && (
          <Button
            disabled={selectedTimeSlot == null}
            onClick={() => {
              setNext(true);
            }}
            color="success"
            variant="contained"
          >
            Next
          </Button>
        )}
        {next == true && (
          <Button
            disabled={selectedTimeSlot == null}
            onClick={() => {
              setNext(false);
            }}
            variant="contained"
          >
            Back
          </Button>
        )}
        {next == true && (
          <Button
            onClick={submitAppointment}
            disabled={customerName == "" || vehicleRegNum == ""}
            color="success"
            variant="contained"
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
