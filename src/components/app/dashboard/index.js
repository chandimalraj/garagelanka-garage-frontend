import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../../services/dashBoardService";
import DoughnutChart from "./doughnutChart/DoughnutChart";

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
  const navigate = useNavigate();
  const toGarage = () => {
    navigate("/nav");
  };
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
        formData?.startDate02,
        formData?.endDate02
      );
      setDataByServiceType(response?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppoinmentsByDate();
  }, [formData?.startDate, formData?.endDate]);

  useEffect(() => {
    getAppoinmentsByDateAndServiceType();
  }, [formData?.startDate02, formData?.endDate02]);

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
        }}
      >
        <Grid container>
          <Grid item lg={6} sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex" }}>
              <FieldWrapper>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={dayjs(formData?.startDate)}
                    // value={state.action === DEF_ACTIONS.VIEW || state.action === DEF_ACTIONS.EDIT ? dayjs(formData?.expenseDate) : formData?.expenseDate}
                    // disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) => {
                      console.log(dayjs(e));
                      handleChange(dayjs(e).format("YYYY-MM-DD"), "startDate");
                    }}
                    sx={{
                      width: "100%",
                      marginTop: "9px",
                      ".MuiInputBase-root": {
                        //height: '40px', // Apply height to input container
                        // display: 'flex', // Ensure flex container to align items properly
                        // alignItems: 'center', // Center align items vertically
                      },
                      ".MuiInputBase-input": {
                        height: "inherit", // Apply height to input
                        padding: "10px", // Adjust padding to fit the height
                        //boxSizing: "border-box", // Ensure padding doesn't affect height
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
                    // value={state.action === DEF_ACTIONS.VIEW || state.action === DEF_ACTIONS.EDIT ? dayjs(formData?.expenseDate) : formData?.expenseDate}
                    // disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) => {
                      console.log(dayjs(e));
                      handleChange(dayjs(e).format("YYYY-MM-DD"), "endDate");
                    }}
                    sx={{
                      width: "100%",
                      marginTop: "9px",
                      ".MuiInputBase-root": {
                        //height: '40px', // Apply height to input container
                        // display: 'flex', // Ensure flex container to align items properly
                        // alignItems: 'center', // Center align items vertically
                      },
                      ".MuiInputBase-input": {
                        height: "inherit", // Apply height to input
                        padding: "10px", // Adjust padding to fit the height
                        //boxSizing: "border-box", // Ensure padding doesn't affect height
                      },
                    }}
                    defaultValue={dayjs(new Date())}
                  />
                </LocalizationProvider>
              </FieldWrapper>
            </Box>
            <StackedBarChart allData={data} />
          </Grid>
          <Grid item lg={6} sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex" }}>
              <FieldWrapper>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={dayjs(formData?.startDate02)}
                    // value={state.action === DEF_ACTIONS.VIEW || state.action === DEF_ACTIONS.EDIT ? dayjs(formData?.expenseDate) : formData?.expenseDate}
                    // disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) => {
                      console.log(dayjs(e));
                      handleChange(
                        dayjs(e).format("YYYY-MM-DD"),
                        "startDate02"
                      );
                    }}
                    sx={{
                      width: "100%",
                      marginTop: "9px",
                      ".MuiInputBase-root": {
                        //height: '40px', // Apply height to input container
                        // display: 'flex', // Ensure flex container to align items properly
                        // alignItems: 'center', // Center align items vertically
                      },
                      ".MuiInputBase-input": {
                        height: "inherit", // Apply height to input
                        padding: "10px", // Adjust padding to fit the height
                        //boxSizing: "border-box", // Ensure padding doesn't affect height
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
                    value={dayjs(formData?.endDate02)}
                    // value={state.action === DEF_ACTIONS.VIEW || state.action === DEF_ACTIONS.EDIT ? dayjs(formData?.expenseDate) : formData?.expenseDate}
                    // disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) => {
                      console.log(dayjs(e));
                      handleChange(dayjs(e).format("YYYY-MM-DD"), "endDate02");
                    }}
                    sx={{
                      width: "100%",
                      marginTop: "9px",
                      ".MuiInputBase-root": {
                        //height: '40px', // Apply height to input container
                        // display: 'flex', // Ensure flex container to align items properly
                        // alignItems: 'center', // Center align items vertically
                      },
                      ".MuiInputBase-input": {
                        height: "inherit", // Apply height to input
                        padding: "10px", // Adjust padding to fit the height
                        //boxSizing: "border-box", // Ensure padding doesn't affect height
                      },
                    }}
                    defaultValue={dayjs(new Date())}
                  />
                </LocalizationProvider>
              </FieldWrapper>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DoughnutChart allData={dataByServiceType} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
