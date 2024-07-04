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
import { addEmployee } from "../../../../services/employeeService";
import { showToasts } from "../../../toast";

export default function EmployeeForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [bankData, setBankData] = useState({
    accountNumber: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
  });

  const [formData, setFormData] = useState(
    state.data
      ? state.data
      : {
          firstName: "",
          lastName: "",
          gender: "",
          nic: "",
          mobile: "",
          email: "",
          salaryType: "",
          salary: 0,
          addressLineOne: "",
          addressLineTwo: "",
          emergencyContactNum1: "",
          emergencyContactNum2: "",
          bankAccount: bankData,
          userRole: "",
          password: "",
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
    console.log(bankData);
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

  const handleChangeBankData = (value, target) => {
    setBankData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
    setFormData((current = {}) => {
      let newData = { ...current };
      newData.bankAccount[target] = value;
      return newData;
    });
  };

  const submitForm = async () => {
    try {
      const data = { ...formData, bankAccount: bankData };
      const response = await addEmployee(data);
      if (response.status === 200) {
        showToasts("SUCCESS", "Employee Added Successfully!");
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
                disabled={!isFormDataComplete(formData)}
              >
                <Add />
                ADD
              </Button>
            )}
            {state?.action === DEF_ACTIONS.EDIT && (
              <Button
                variant="contained"
                color="success"
                // onClick={submitEditItem}
              >
                <Edit />
                EDIT
              </Button>
            )}
          </ButtonGroup>
        </Box>
        <Grid container sx={{ marginTop: 2 }}>
          <Title>General Details</Title>

          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="fname"
                id="fname"
                value={formData?.firstName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "firstName")
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
                label="First Name"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="lastName"
                id="lastName"
                value={formData?.lastName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "lastName")
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
                label="Last Name"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "#F1F1F1", marginTop: "10px" }}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  value={formData?.gender || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "gender")
                  }
                  sx={{
                    //   borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  }}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  size="small"
                  variant="outlined"
                  label="First Name"
                  fullWidth
                >
                  <MenuItem value={"MALE"}>Male</MenuItem>
                  <MenuItem value={"FEMALE"}>Female</MenuItem>
                </Select>
              </FormControl>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="nic"
                id="nic"
                value={formData?.nic || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "nic")}
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
                label="Nic"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "#F1F1F1", marginTop: "15px" }}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  value={formData?.userRole || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "userRole")
                  }
                  sx={{
                    //   borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  }}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  size="small"
                  variant="outlined"
                  label="First Name"
                  fullWidth
                >
                  <MenuItem value={"Receptionist"}>Receptionist</MenuItem>
                  <MenuItem value={"Technician"}>Technician</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                </Select>
              </FormControl>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="password"
                id="password"
                value={formData?.password || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "password")
                }
                type="text"
                sx={{
                  "& .MuiInputBase-root": {
                    // borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  },
                  marginTop: "15px",
                }}
                size="small"
                variant="outlined"
                label="Password"
              />
            </FieldWrapper>
          </Grid>
          <Title>Contact Details</Title>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="mobile"
                id="mobile"
                value={formData?.mobile || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "mobile")}
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
                label="Mobile"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="email"
                id="email"
                value={formData?.email || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "email")}
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
                label="Email"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="emergencyContactNum1"
                id="emergencyContactNum1"
                value={formData?.emergencyContactNum1 || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "emergencyContactNum1")
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
                label="Emergency Contact Num 01"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="emergencyContactNum2"
                id="emergencyContactNum2"
                value={formData?.emergencyContactNum2 || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "emergencyContactNum2")
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
                label="Emergency Contact Num 02"
              />
            </FieldWrapper>
          </Grid>
          <Title>Address Details</Title>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="addressLineOne"
                id="addressLineOne"
                value={formData?.addressLineOne || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "addressLineOne")
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
                label="Address Line one"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="addressLineTwo"
                id="addressLineTwo"
                value={formData?.addressLineTwo || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "addressLineTwo")
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
                label="Address Line Two"
              />
            </FieldWrapper>
          </Grid>
          <Title>Salary Details</Title>
          <Grid item lg={2}>
            <FieldWrapper>
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "#F1F1F1", marginTop: "10px" }}
              >
                <InputLabel id="gender-label">Salary Type</InputLabel>
                <Select
                  value={formData?.salaryType || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "salaryType")
                  }
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  sx={{
                    //   borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  }}
                  size="small"
                  variant="outlined"
                  label="Salary type"
                  fullWidth
                >
                  <MenuItem value={"DAILY"}>Daily</MenuItem>
                  <MenuItem value={"MONTHLY"}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                name="salary"
                id="salary"
                value={formData?.salary || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "salary")}
                type="number"
                defaultValue={"0"}
                sx={{
                  "& .MuiInputBase-root": {
                    // borderRadius: "8px",
                    backgroundColor: "#F1F1F1",
                  },
                  marginTop: "10px",
                }}
                size="small"
                variant="outlined"
                label="Salary"
                inputProps={{ min: 0 }}
              />
            </FieldWrapper>
          </Grid>
          <Title>Bank Account Details</Title>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="accountNumber"
                id="accountNumber"
                value={formData?.bankAccount?.accountNumber || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChangeBankData(e?.target?.value || "", "accountNumber")
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
                label="Bank Account Number"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="accountHolderName"
                id="accountHolderName"
                value={formData?.bankAccount?.accountHolderName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChangeBankData(
                    e?.target?.value || "",
                    "accountHolderName"
                  )
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
                label="Account Holder Name"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="bankName"
                id="bankName"
                value={formData?.bankAccount?.bankName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChangeBankData(e?.target?.value || "", "bankName")
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
                label="Bank"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="branchName"
                id="branchName"
                value={formData?.bankAccount?.branchName}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChangeBankData(e?.target?.value || "", "branchName")
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
                label="Branch"
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
