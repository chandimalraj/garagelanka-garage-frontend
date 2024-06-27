import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Add, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DEF_ACTIONS } from "../../../../utils/constants/actions";
import ListOfVehicles from "./listOfVehicles/ListOfVehicles";
import {
  getVehicleMakes,
  getVehicleModels,
} from "../../../../services/inventoryService";
import { v4 as uuidv4 } from "uuid";

export default function CustomerForm() {
  //const location = useLocation();
  //useIsUserLoggedIn();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    state?.item || { category: state?.category, unit: "PCS" }
  );

  const [accordianExpansion, setaccordianExpansion] = useState({
    vehicleDetailsPanel: false,
  });

  const [loading, setLoading] = useState(true);
  const [vehicleMakes, setvehicleMakes] = useState([]);
  const [vehicleModels, setvehicleModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState({
    id: uuidv4(),
    make: "",
    make_name: "",
    make_id: "",
    model: "",
    model_name: "",
    registationNumber: "",
  });

  const handleDelete = (id) => {
    const newArray = vehicles.filter((vehicle) => vehicle?.id !== id);
    setVehicles(newArray);
  };
  useEffect(() => {
    const initVehicleMakes = async () => {
      try {
        const vehcleMakesResponse = await getVehicleMakes();
        console.log(vehcleMakesResponse.data);
        setvehicleMakes(vehcleMakesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    setLoading(true);
    initVehicleMakes();
    setLoading(false);
  }, []);

  useEffect(() => {
    const initVehicleModels = async () => {
      try {
        const vehcleModelResponse = await getVehicleModels(
          vehicleDetails.make_id
        );
        //inventoryItem.vehicle.makeCategoryId

        setvehicleModels(vehcleModelResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    initVehicleModels();
  }, [vehicleDetails.make_id]);

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

  const addVehicle = () => {
    setVehicles([...vehicles, vehicleDetails]);
    setVehicleDetails({
      id: uuidv4(),
      make: "",
      make_name: "",
      make_id: "",
      model: "",
      model_name: "",
      registationNumber: "",
    });
  };

  const submitForm = async () => {
    console.log(vehicles);
    try {
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
      <Paper sx={{ padding: 2, height: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ButtonGroup>
            <Button color="success" variant="contained" onClick={goBack}>
              <KeyboardDoubleArrowLeftIcon />
              BACK
            </Button>
            {state?.action === DEF_ACTIONS.ADD && (
              <Button color="success" variant="contained" onClick={submitForm}>
                <Add />
                ADD
              </Button>
            )}
            {state?.action === DEF_ACTIONS.EDIT && (
              <Button
                variant="contained"
                color="success"
                //onClick={submitEditItem}
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
          <Grid item lg={9}>
            <Accordion
              expanded
              onChange={(e, expanded) =>
                setaccordianExpansion((prev) => ({
                  ...prev,
                  vehicleDetailsPanel: expanded,
                }))
              }
              style={{ marginTop: 15 }}
            >
              <AccordionSummary
                aria-controls="vehicleDetailsPanel-content"
                id="vehicleDetailsPanel-header"
              >
                <Grid container spacing={2}>
                  <Grid item lg={9}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                      }}
                      variant="h6"
                    >
                      Vehicle details - Fill here each vehicle details and add
                      it before add another vehicle
                    </Typography>
                  </Grid>
                  <Grid item lg={3}>
                    <Button
                      color="success"
                      variant="contained"
                      onClick={addVehicle}
                      disabled={
                        vehicleDetails.model === "" ||
                        vehicleDetails.registationNumber === ""
                      }
                    >
                      Add vehicle
                    </Button>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item lg={4} sx={{ paddingInline: 1 }}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="makeName-label">Make name</InputLabel>
                      <Select
                        disabled={loading}
                        labelId="makeName-label"
                        name="makeName"
                        id="makeName"
                        variant="outlined"
                        label="Make name"
                        value={vehicleDetails.make_name}
                        onChange={(event, key) => {
                          setVehicleDetails({
                            ...vehicleDetails,
                            make: vehicleMakes.find(
                              (make) => make.name_en === event.target.value
                            )._id,
                            make_name: event.target.value,
                            make_id: vehicleMakes.find(
                              (make) => make.name_en === event.target.value
                            ).make_id,
                          });
                        }}
                        sx={{
                          backgroundColor: "#F1F1F1",
                          marginRight: "10px",
                          height: "50px",
                        }}
                        fullWidth
                      >
                        {vehicleMakes.map((make, index) => (
                          <MenuItem key={make} value={make.name_en}>
                            {make.name_en}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={4} sx={{ paddingInline: 1 }}>
                    <FormControl
                      sx={{ width: "100%" }}
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel id="modelName-label">Model name</InputLabel>
                      <Select
                        disabled={loading}
                        labelId="modelName-label"
                        name="modelName"
                        id="modelName"
                        variant="outlined"
                        label="Model Name"
                        value={vehicleDetails?.model_name}
                        onChange={(event) => {
                          setVehicleDetails({
                            ...vehicleDetails,
                            model: vehicleModels.find(
                              (model) => model.name_en === event.target.value
                            )._id,
                            model_name: event.target.value,
                          });
                        }}
                        sx={{
                          backgroundColor: "#F1F1F1",
                          height: "50px",
                        }}
                        fullWidth
                      >
                        {vehicleModels.map((make, index) => (
                          <MenuItem key={index} value={make.name_en}>
                            {make.name_en}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={4} sx={{ paddingInline: 1 }}>
                    {" "}
                    <TextField
                      disabled={loading}
                      id="vehicleRegNumber"
                      label="Vehicle Reg Number"
                      name="vehicleRegNumber"
                      type="text"
                      value={vehicleDetails.registationNumber}
                      onChange={(event) => {
                        setVehicleDetails({
                          ...vehicleDetails,
                          registationNumber: event.target.value,
                        });
                      }}
                      margin="normal"
                      sx={{
                        width: "100%",
                        backgroundColor: "#f5f7f7",
                        margin: "0px",

                        "& .MuiInputBase-root": {
                          // borderRadius: "8px",
                          backgroundColor: "#F1F1F1",
                          height: "50px",
                        },
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <ListOfVehicles
                      data={vehicles}
                      handleDelete={handleDelete}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
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
