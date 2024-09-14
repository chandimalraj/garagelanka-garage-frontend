import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserValid } from "../../../hooks/authentication";
import { Box, Grid, Paper } from "@mui/material";
import StackedBarChart from "./stackedBarChart/StackedBarChart";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FieldWrapper } from "../expenses/expensesForm/ExpenseForm";
import { getAppoinments } from "../../../services/dashBoardService";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    startDate: new Date().getDate() - 1,
    endDate: new Date(),
  });
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
    try {
      const response = await getAppoinments(
        formData?.startDate,
        formData?.endDate
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppoinmentsByDate();
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
        }}
      >
        <Grid container>
          <Grid item lg={6}>
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
                      handleChange(dayjs(e), "startDate");
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
                      handleChange(dayjs(e), "endDate");
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
            <StackedBarChart />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
