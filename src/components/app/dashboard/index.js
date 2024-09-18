import React, { useEffect, useState } from "react";
import { useUserValid } from "../../../hooks/authentication";
import { Box, Grid, Paper } from "@mui/material";
import StackedBarChart from "./stackedBarChart/StackedBarChart";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FieldWrapper } from "../expenses/expensesForm/ExpenseForm";
import {
  getAppoinments,
  getAppoinmentsByServiceType,
  getNetProfit,
  getNumberOfAppoinments,
  getTotalExpenses,
  getTotalInvoice,
} from "../../../services/dashBoardService";
import DoughnutChart from "./doughnutChart/DoughnutChart";
import CustomCard from "./customCard/CustomCard";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TimeCard from "./timeCard/TimeCard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function Dashboard() {
  const getOneWeekBefore = () => {
    const today = new Date(); // Current date
    const oneWeekBefore = new Date(today); // Create a copy of today's date
    oneWeekBefore.setDate(today.getDate() - 7); // Subtract 7 days
    return oneWeekBefore; // Return the date one week before today
  };

  const [formData, setFormData] = useState({
    startDate: getOneWeekBefore(),
    endDate: new Date(),
    startDate02: getOneWeekBefore(),
    endDate02: new Date(),
  });

  const [data, setData] = useState();
  const [dataByServiceType, setDataByServiceType] = useState();
  const [numberOfBookings, setNumberOfBookings] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  useUserValid();

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const getAppoinmentsByDate = async () => {
    console.log(formData);
    try {
      const response = await getAppoinments(
        formData?.startDate,
        formData?.endDate
      );
      setData(response?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppoinmentsByDateAndServiceType = async () => {
    console.log(formData);
    try {
      const response = await getAppoinmentsByServiceType(
        formData?.startDate,
        formData?.endDate
      );
      setDataByServiceType(response?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingsCount = async () => {
    try {
      const response = await getNumberOfAppoinments(
        formData?.startDate,
        formData?.endDate
      );
      setNumberOfBookings(response?.data?.data?.numOfBookings);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalIncome = async () => {
    try {
      const response = await getTotalInvoice(
        formData?.startDate,
        formData?.endDate
      );
      setTotalIncome(response?.data?.data?.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalExpensesByDate = async () => {
    try {
      const response = await getTotalExpenses(
        formData?.startDate,
        formData?.endDate
      );
      setTotalExpenses(response?.data?.data?.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const getNetProfitByDate = async () => {
    try {
      const response = await getNetProfit(
        formData?.startDate,
        formData?.endDate
      );
      setNetProfit(response?.data?.data?.netProfit);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppoinmentsByDate();
    getAppoinmentsByDateAndServiceType();
    getBookingsCount();
    getTotalIncome();
    getTotalExpensesByDate();
    getNetProfitByDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.startDate, formData?.endDate]);

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
          height: "1500px",
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 4%, rgba(108,108,108,1) 90%)",
        }}
      >
        <Grid container>
          <Grid item lg={12} sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                <FieldWrapper>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={dayjs(formData?.startDate)}
                      onChange={(e) => {
                        console.log(dayjs(e));
                        handleChange(
                          dayjs(e).format("YYYY-MM-DD"),
                          "startDate"
                        );
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
                <FieldWrapper>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={dayjs(formData?.endDate)}
                      onChange={(e) => {
                        console.log(dayjs(e));
                        handleChange(dayjs(e).format("YYYY-MM-DD"), "endDate");
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
              </Box>
              <TimeCard />
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ padding: "20px" }}>
            <CustomCard
              header={numberOfBookings}
              subHeader={"Number Of Appoinments"}
              icon={<BookOnlineIcon />}
              background={
                "linear-gradient(90deg, rgba(250,251,252,1) 4%, rgba(112,198,247,1) 90%);"
              }
            />
          </Grid>
          <Grid item lg={3} sx={{ padding: "20px" }}>
            <CustomCard
              header={totalIncome.toFixed(2)}
              subHeader={"Total Income LKR"}
              icon={<MonetizationOnIcon />}
              background={
                "linear-gradient(90deg, rgba(250,251,252,1) 4%, rgba(112,198,247,1) 90%);"
              }
            />
          </Grid>
          <Grid item lg={3} sx={{ padding: "20px" }}>
            <CustomCard
              header={totalExpenses.toFixed(2)}
              subHeader={"Total Expense LKR"}
              icon={<RequestQuoteIcon />}
              background={
                "linear-gradient(90deg, rgba(250,251,252,1) 4%, rgba(112,198,247,1) 90%);"
              }
            />
          </Grid>
          <Grid item lg={3} sx={{ padding: "20px" }}>
            <CustomCard
              header={netProfit.toFixed(2)}
              subHeader={"Net Profit LKR"}
              icon={<CurrencyExchangeIcon />}
              background={
                "linear-gradient(90deg, rgba(250,251,252,1) 4%, rgba(112,198,247,1) 90%);"
              }
            />
          </Grid>
          <Grid item lg={6} sx={{ padding: "20px" }}>
            <Paper sx={{ padding: "20px" }}>
              <StackedBarChart allData={data} />
            </Paper>
          </Grid>
          <Grid item lg={6} sx={{ padding: "20px" }}>
            <Paper sx={{ padding: "20px" }}>
              <DoughnutChart allData={dataByServiceType} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
