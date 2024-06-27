import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    Grid,
    IconButton,
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
  import { Add, Category, Edit } from "@mui/icons-material";
  import { useLocation, useNavigate } from "react-router-dom";
  import styled from "styled-components";
  import { PhotoCamera } from "@mui/icons-material";
  import { useIsUserLoggedIn } from "../../../../hooks/authentication";
  import { DEF_ACTIONS } from "../../../../utils/constants/actions";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
  
  export default function CustomerForm() {
    //const location = useLocation();
    //useIsUserLoggedIn();
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log(state);
    const [selectedImage, setSelectedImage] = useState(
      state?.item?.image_url || null
    );
    const [form, setForm] = useState();
  
    const [formData, setFormData] = useState(
      state?.item || { category: state?.category, unit: "PCS" }
    );
  
    function goBack() {
      navigate(-1); // This will navigate back in the history stack
    }
    const handleImageChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
      //const form = new FormData();
      //form.append("file", file);
      setForm(file);
    };
  
    const handleChange = (value, target) => {
      setFormData((current = {}) => {
        let newData = { ...current };
        newData[target] = value;
        return newData;
      });
    };
  
    const submitForm = async () => {
      try {
        const formDataNew = new FormData();
        formDataNew.append("file", form);
        formDataNew.append("name", formData?.name);
        formDataNew.append("category", formData?.category);
        formDataNew.append("price", formData?.price);
        formDataNew.append("unit", formData?.unit);
        formDataNew.append("supplier", formData?.supplier);
        formDataNew.append("image_url", "");
  
        console.log(formDataNew);
  
        //const response = await createItem(formDataNew, onSuccess, onError);
        //console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  
    const submitEditItem = async () => {
      try {
        const formDataNew = new FormData();
        formDataNew.append("file", form);
        formDataNew.append("id", formData?.id);
        formDataNew.append("name", formData?.name);
        formDataNew.append("category", formData?.category);
        formDataNew.append("price", formData?.price);
        formDataNew.append("unit", formData?.unit);
        formDataNew.append("supplier", formData?.supplier);
        formDataNew.append("image_url", formData?.image_url);
  
        console.log(formDataNew);
      } catch (error) {
        console.log(error);
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
        <Paper sx={{ padding: 2, height: 600 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <ButtonGroup>
              <Button color="success" variant="contained" onClick={goBack}>
                <KeyboardDoubleArrowLeftIcon />
                BACK
              </Button>
              {state?.action == DEF_ACTIONS.ADD && (
                <Button color="success" variant="contained" onClick={submitForm}>
                  <Add />
                  ADD
                </Button>
              )}
              {state?.action == DEF_ACTIONS.EDIT && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={submitEditItem}
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
                    size="small"
                    variant="outlined"
                    label="First Name"
                    fullWidth
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
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
                    sx={{
                      //   borderRadius: "8px",
                      backgroundColor: "#F1F1F1",
                    }}
                    size="small"
                    variant="outlined"
                    label="Salary type"
                    fullWidth
                  >
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
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
  
            <Grid item lg={3}>
              <FieldWrapper>
                <TextField
                  name="accountNumber"
                  id="accountNumber"
                  value={formData?.accountNumber || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "accountNumber")
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
                  value={formData?.accountHolderName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "accountHolderName")
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
                  value={formData?.bankName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "bankName")
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
                  value={formData?.branchName || ""}
                  fullWidth
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "branchName")
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
  
            {/* <Grid item lg={8}>
              <FieldWrapper>
                <FieldName>Select Item Picture</FieldName>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-picture-input"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
  
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ position: "relative" }}
                  >
                    <label
                      htmlFor="profile-picture-input"
                      style={{
                        width: "340px",
                        height: "240px",
                        border: "1px solid #7a879d",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton component="span" style={{ zIndex: "2" }}>
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    {selectedImage && (
                      <div
                        style={{
                          position: "absolute",
                          zIndex: "1",
                          backgroundColor: "rgb(46,125,50,0.1)",
                          width: "340px",
                          height: "240px",
                          // borderRadius: "70px",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={selectedImage}
                          alt="Profile"
                          style={{
                            width: "340px",
                            height: "240px",
                            // borderRadius: "70px",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}
                  </Box>
                </div>
              </FieldWrapper>
            </Grid> */}
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
  