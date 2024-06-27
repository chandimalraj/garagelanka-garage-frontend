import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ListOfVehicles from "./listOfVehicles/ListOfVehicles";

export default function CustomerForm() {
  //const location = useLocation();
  //useIsUserLoggedIn();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(
    state?.item?.image_url || null
  );
  const [form, setForm] = useState();

  const [formData, setFormData] = useState(
    state?.item || { category: state?.category, unit: "PCS" }
  );

  const [accordianExpansion, setaccordianExpansion] = useState({
    vehicleDetailsPanel: false,
  });

  const [vehicles, setVehicles] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    make_name: "",
    model: "",
    model_name: "",
    registationNumber: "",
  });

  //   const addVehicleData = () => {
  //     setNumOfVehicles((prevItems) => [...prevItems, 1]);
  //   };

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
      <Paper sx={{ padding: 2, height: 640 }}>
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

          <Grid item lg={4}>
            <FieldWrapper>
              <TextField
                name="coustomerName"
                id="coustomerName"
                value={formData?.coustomerName || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "coustomerName")
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
                label="Name"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                name="coustomerMobile"
                id="coustomerMobile"
                value={formData?.coustomerMobile || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "coustomerMobile")
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
                label="Mobile"
              />
            </FieldWrapper>
          </Grid>

          <Title>Vehicle Details</Title>
          <Accordion
            expanded
            onChange={(e, expanded) =>
              setaccordianExpansion((prev) => ({
                ...prev,
                vehicleDetailsPanel: expanded,
              }))
            }
            style={{ marginTop: 15 }}
            //className={classes.accordion}
          >
            <AccordionSummary
              aria-controls="vehicleDetailsPanel-content"
              id="vehicleDetailsPanel-header"
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography
                    //className={classes.topic_test_1}
                    sx={{
                      fontFamily: "Poppins",
                    }}
                    variant="h6"
                  >
                    Vehicle details - Fill here if the part is compatible only
                    for a specific vehicle.
                  </Typography>
                </Grid>
                <Grid item lg={3}>
                  <Button
                    color="success"
                    variant="contained"
                    //onClick={addVehicleData}
                  >
                    Add vehicle
                  </Button>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Grid container>
                  <Grid item lg={4}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="makeName-label">Make name</InputLabel>
                      <Select
                        //disabled={loading}
                        labelId="makeName-label"
                        name="makeName"
                        id="makeName"
                        //value={inventoryItem.vehicle.makeName}
                        //onChange={handleOnChangeInput}
                        sx={{
                          //width: "100%",
                          backgroundColor: "#f5f7f7",
                          marginRight: "10px",
                        }}
                        fullWidth
                      >
                        <MenuItem value="none" key="none">
                          <em>None</em>
                        </MenuItem>
                        {/* {vehicleMakes.map((make, index) => (
                          <MenuItem key={index} value={make.name_en}>
                            {make.name_en}
                          </MenuItem>
                        ))} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={4}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="makeName-label">Model name</InputLabel>
                      <Select
                        //disabled={loading}
                        labelId="Model Name"
                        name="modelName"
                        id="modelName"
                        //value={inventoryItem.vehicle.modelName}
                        //onChange={handleOnChangeInput}
                        sx={{
                          //width: "200px",
                          backgroundColor: "#f5f7f7",
                         // marginRight: "10px",
                        }}
                      >
                        {/* {vehicleModels.map((make, index) => (
                          <MenuItem key={index} value={make.name_en}>
                            {make.name_en}
                          </MenuItem>
                        ))} */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={4}>
                    {" "}
                    <TextField
                      //disabled={loading}
                      id="year"
                      label="Year"
                      name="year"
                      type="number"
                      //value={inventoryItem.vehicle.year}
                      ///onChange={handleOnChangeInput}
                      margin="normal"
                      sx={{
                        width: "100%",
                        backgroundColor: "#f5f7f7",
                        margin: "0px",
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListOfVehicles />
              </Box>
            </AccordionDetails>
          </Accordion>
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
