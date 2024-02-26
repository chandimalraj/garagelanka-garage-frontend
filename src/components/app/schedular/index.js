import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
import NewAppoinment from "./NewAppointment/NewAppoinmentDialog";
import {
  filterAppoinmentsByPhone,
  filterAppoinmentsByVehicleNumber,
  getAllAppoinments,
} from "../../../services/bookingService";
import Appoinment from "./Appoinment";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

export default function Schedular() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appoinments, setAppoinments] = useState([]);
  const [openConf, setOpenConf] = useState(false);
  const [confMsg, setConfMsg] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [phone, setPhone] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    getAppoinments(new Date(), page);
  }, []);

  const getAppoinments = async (date, page) => {
    // Set the time to 00:00:00 (midnight)
    const midnightDate = date;
    midnightDate.setHours(0, 0, 0, 0);

    // Set the time to 23:59:59 (end of the day)
    const endOfDayDate = date;
    endOfDayDate.setHours(23, 59, 59, 999);
    try {
      const response = await getAllAppoinments(
        midnightDate,
        endOfDayDate,
        page
      );
      setAppoinments(response.data.Bookings.docs);
      setTotalPages(response.data.Bookings.totalPages);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateOnChange = (e) => {
    setSelectedDate(e);
  };
  const [open, setOpen] = useState(false);

  const tileDisabled = ({ date, view }) => {
    // Disable the specific day (e.g., Sunday)
    return view === "month" && date.getDay() === new Date();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseConf = () => {
    setOpenConf(false);
  };

  const confirmAction = () => {
    if(confMsg == "Are You sure you want to procced this appoinment"){
       navigate("/invoice")
    }
  };
  const proceedAppoinment = () => {
    setConfMsg("Are You sure you want to procced this appoinment");
    setOpenConf(true);
  };
  const deleteAppoinment = () => {
    setConfMsg("Are You sure you want to delete this appoinment");
    setOpenConf(true);
  };

  const handleChange = (event, value) => {
    setPage(value);
    console.log(value);
    if (phone.length > 0) {
      getAppoinmentsByPhone(phone, value);
      return;
    }
    getAppoinments(new Date(), value);
  };

  const getAppoinmentsByPhone = async (phone, page) => {
    try {
      const response = await filterAppoinmentsByPhone(phone, page);
      setAppoinments(response.data.Bookings.docs);
      setTotalPages(response.data.Bookings.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppoinmentsByVehicleNumber = async (vehicleNumber, page) => {
    try {
      const response = await filterAppoinmentsByVehicleNumber(
        vehicleNumber,
        page
      );
      setAppoinments(response.data.Bookings.docs);
      setTotalPages(response.data.Bookings.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setPhone("");
    setVehicleNumber("");
    getAppoinments(new Date(), 1);
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
          <Grid
            item
            lg={4}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingInline: "15px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                defaultValue={dayjs(new Date())}
                sx={{
                  ".MuiPickersToolbar-root": {
                    color: "#65B741",
                    borderRadius: 2,
                    borderWidth: 1,
                    borderColor: "#65B741",
                    border: "1px solid",
                    marginTop: "10px",
                    // backgroundColor: "#bbdefb",
                  },
                  ".MuiPickersCalendarFooter-root": {
                    display: "none", // Hide the footer which contains the "OK" and "Cancel" buttons
                  },
                  ".MuiTypography-body": {
                    // Style for day numbers in the calendar
                    fontSize: "16px", // Set your desired font size
                  },
                  ".MuiPickersCalendarHeader-dayLabel": {
                    // Style for day labels in the calendar header
                    fontSize: "14px", // Set your desired font size
                  },
                  ".css-1lb25gb-MuiButtonBase-root-MuiPickersDay-root": {
                    fontSize: "18px",
                  },
                  ".css-dplwbx-MuiPickersCalendarHeader-label": {
                    fontSize: "18px",
                  },
                  ".css-108qa3v-MuiTypography-root-MuiDayCalendar-weekDayLabel":
                    {
                      fontSize: "18px",
                    },
                  ".css-1po6ot5-MuiPickersLayout-root .MuiPickersLayout-actionBar":
                    {
                      opacity: "0 !important",
                    },
                }}
                minDate={dayjs(new Date())}
                okText="" // Disable the OK button
                cancelText="" // Disable the Cancel button
                PopoverProps={{
                  sx: {
                    ".MuiPickersCalendarFooter-root": {
                      display: "none", // Hide the footer which contains the "OK" and "Cancel" buttons
                    },
                  },
                }}
                onChange={(e) => {
                  setSelectedDate(dayjs(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
                  getAppoinments(new Date(e));
                  console.log(new Date(e));
                  //console.log(dayjs(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            lg={8}
            style={{
              display: "flex",
              flexDirection: "column",

              paddingInline: "15px",
            }}
          >
            <Grid container sx={{ marginBottom: "30px" }}>
              <Grid item lg={3} sx={{ paddingRight: "10px" }}>
                <TextField
                  name="phone"
                  id="phone"
                  value={phone}
                  fullWidth
                  onChange={(e) => {
                    if (vehicleNumber.length > 0) {
                      setVehicleNumber("");
                    }
                    setPhone(e.target.value);
                    getAppoinmentsByPhone(e.target.value, page);
                    // getOrdersByPhone(e.target.value);
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
                  size="small"
                  variant="outlined"
                  label="Search by phone"
                />
              </Grid>
              <Grid item lg={3} sx={{ paddingRight: "10px" }}>
                <TextField
                  name="vehicleNumber"
                  id="vehicleNumber"
                  value={vehicleNumber}
                  fullWidth
                  onChange={(e) => {
                    if (phone.length > 0) {
                      setPhone("");
                    }
                    setVehicleNumber(e.target.value);
                    getAppoinmentsByVehicleNumber(e.target.value, 1);
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
                  size="small"
                  variant="outlined"
                  label="Search by Vehicle"
                />
              </Grid>
              <Grid item lg={2}>
                <Button
                  variant="outlined"
                  sx={{
                    // width: "200px",
                    marginTop: "12px",
                    // marginLeft: "40px",
                    fontSize: "13px",
                  }}
                  color="success"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid
                item
                lg={4}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "200px",
                    marginTop: "10px",
                    fontSize: "13px",
                  }}
                  color="success"
                  onClick={handleOpen}
                >
                  Add New Appoinment
                </Button>
              </Grid>
            </Grid>
            <AppoinmentContainer>
              {appoinments.length > 0 &&
                appoinments.map((item, index) => (
                  <Appoinment
                    data={item}
                    proceed={proceedAppoinment}
                    deleteAppoinment={deleteAppoinment}
                  />
                ))}
            </AppoinmentContainer>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <NewAppoinment
        open={open}
        confirmAction={getAppoinments}
        handleClose={handleClose}
      />
      <ConfirmationDialog
        open={openConf}
        confirmMsg={confMsg}
        handleClose={handleCloseConf}
        ConfirmAction={confirmAction}
      />
    </Box>
  );
}

const AppoinmentContainer = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
`;
