import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Add, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DEF_ACTIONS } from "../../../../utils/constants/actions";
import {
  addEmployee,
  editEmployee,
} from "../../../../services/employeeService";
import { showToasts } from "../../../toast";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createEexpense, updateExpense } from "../../../../services/expensesService";

export default function ExpenseForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const [formData, setFormData] = useState(
    state.data
      ? state.data
      : {
          category: "",
          expenseDate: dayjs(new Date()),
          totalAmount: "",
          description: "",
        }
  );

  const isFormDataComplete = (data) => {
    // Helper function to check if a value is empty
    const isEmpty = (value) => {
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "number" && isNaN(value))
      );
    };

    // Iterate through the formData object
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === "object" && data[key] !== null) {
          // If the property is an object, check its properties
          if (isFormDataComplete(data[key]) === false) {
            return false;
          }
        } else {
          if (isEmpty(data[key])) {
            return false;
          }
        }
      }
    }
    console.log(formData);

    console.log(true);
    return true;
  };

  function goBack() {
    navigate(-1); // This will navigate back in the history stack
  }

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const submitForm = async () => {
    try {
      const data = { ...formData };
      if (state.action === DEF_ACTIONS.ADD) {
        const response = await createEexpense(data);
        if (response.status === 201) {
          showToasts("SUCCESS", "Expense Added Successfully!");
        }
      }
      if (state.action === DEF_ACTIONS.EDIT) {
        const response = await updateExpense(data);
        if (response.status === 200) {
          showToasts("SUCCESS", "Expense Updated Successfully!");
        }
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Error Occured");
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
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ButtonGroup>
            <Button color="success" variant="contained" onClick={goBack}>
              <KeyboardDoubleArrowLeftIcon />
              BACK
            </Button>
            {state?.action === DEF_ACTIONS.ADD && (
              <Button
                color="success"
                variant="contained"
                onClick={submitForm}
                //disabled={!isFormDataComplete(formData)}
              >
                <Add />
                ADD
              </Button>
            )}
            {state?.action === DEF_ACTIONS.EDIT && (
              <Button variant="contained" color="success" onClick={submitForm}>
                <Edit />
                EDIT
              </Button>
            )}
          </ButtonGroup>
        </Box>
        <Grid container sx={{ marginTop: 2 }}>
          <Title>Expense Details</Title>
          <Grid item lg={3}>
            <FieldWrapper>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "#F1F1F1", marginTop: "10px" }}
              >
                <InputLabel id="gender-label">Category</InputLabel>
                <Select
                  value={formData?.category || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "category")
                  }
                  sx={{
                    //borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  }}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  size="small"
                  variant="outlined"
                  label="First Name"
                  fullWidth
                >
                  <MenuItem value={"ITEM"}>Item</MenuItem>
                  <MenuItem value={"SALARY"}>Salary</MenuItem>
                  <MenuItem value={"ELECTRICITY"}>Electricity</MenuItem>
                  <MenuItem value={"WATER"}>Water</MenuItem>
                  <MenuItem value={"OTHER"}>Other</MenuItem>
                </Select>
              </FormControl>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={state.action === DEF_ACTIONS.VIEW || state.action === DEF_ACTIONS.EDIT ? dayjs(formData?.expenseDate) : formData?.expenseDate}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) => {
                    console.log(dayjs(e));
                    handleChange(dayjs(e), "expenseDate");
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
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="totalAmount"
                id="totalAmount"
                value={formData?.totalAmount || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "totalAmount")}
                type="number"
                sx={{
                  "& .MuiInputBase-root": {
                    // borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  },
                  marginTop: "10px",
                }}
                size="small"
                variant="outlined"
                label="Total Amount"
              />
            </FieldWrapper>
          </Grid>

          <Grid item lg={6}>
            <FieldWrapper>
              <TextField
                name="description"
                id="description"
                value={formData?.description || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "description")
                }
                type="text"
                sx={{
                  "& .MuiInputBase-root": {
                    // borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  },
                  marginTop: "10px",
                }}
                size="small"
                variant="outlined"
                label="Description"
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export const FieldName = styled(Typography)`
  && {
    font-size: 13px;

    margin: 10px 0;
  }
`;

export const FieldWrapper = styled(Stack)`
  && {
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 0px;
    padding: 0px 10px;
  }
`;

const Title = styled.div`
  width: 100%;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  padding: 0px 10px;
`;
