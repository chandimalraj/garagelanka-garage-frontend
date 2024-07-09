/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VrpanoIcon from "@mui/icons-material/Vrpano";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEF_ACTIONS } from "../../../utils/constants/actions";
import ListOfCustomers from "./listOfCustomers/ListOfCustomers";
import {
  deleteCustomerById,
  getCustomerByMobile,
  getCustomers,
  getCustomersByVehicle,
} from "../../../services/customerService";
import ListOfVehicles from "./listOfCustomers/listOfVehicels/ListOfVehicles";
import { showToasts } from "../../toast";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";
import {
  getVehicleMakes,
  getVehicleModels,
} from "../../../services/inventoryService";
import { FieldWrapper } from "./customerForm/CustomerForm";

export default function CustomersList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [openConf, setOpenConf] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vehicleMakes, setvehicleMakes] = useState([]);
  const [vehicleModels, setvehicleModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [mobile, setMobile] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

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
        const vehcleModelResponse = await getVehicleModels(selectedMake);
        setvehicleModels(vehcleModelResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    initVehicleModels();
  }, [selectedMake]);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    setSelectedMake("");
    setSelectedModel("");
    setMobile("");
    try {
      const response = await getCustomers(page, limit);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const naviagte = useNavigate();
  const addCustomer = () => {
    naviagte("/customers/add-customer", {
      state: {
        name: location?.state?.name,
        category: location?.state?.category,
        action: DEF_ACTIONS.ADD,
      },
    });
  };

  const editCustomer = () => {
    const item = data.find((item) => item._id === selected[0]);
    naviagte("/customers/edit-customer", {
      state: {
        name: location?.state?.name,
        action: DEF_ACTIONS.EDIT,
        item: item,
      },
    });
  };

  const viewCustomer = () => {
    const item = data.find((item) => item._id === selected[0]);
    naviagte("/customers/view-customer", {
      state: {
        name: location?.state?.name,
        action: DEF_ACTIONS.VIEW,
        item: item,
      },
    });
  };

  useEffect(() => {
    const filteredObject = data.find(
      (dataItem) => dataItem?._id === selected[0]
    );
    console.log(filteredObject);
    setVehicleData(filteredObject?.vehicles);
  }, [selected]);

  const deleteCustomer = async () => {
    try {
      const response = await deleteCustomerById(selected[0]);
      if (response.status === 200) {
        showToasts("SUCCESS", "Customer Deleted Successfully!");
        handleConfDialog();
        getAllCustomers();
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Customer Deletetion Unsuccessfull!");
    }
  };

  const handleConfDialog = () => {
    setOpenConf(!openConf);
  };

  const filterByVehicle = async (makeId, modelId) => {
    try {
      const response = await getCustomersByVehicle(makeId, modelId);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByMobile = async (mobile) => {
    if (mobile.length === 10) {
      try {
        const response = await getCustomerByMobile(mobile);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
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
      <Paper
        elevation={2}
        style={{
          borderRadius: 5,
          padding: 5,
          marginBottom: "20px",
          height: "1500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: 50,
            paddingLeft: "10px",
          }}
        >
          <ButtonGroup>
            <Button
              variant="contained"
              sx={{
                marginTop: "12px",
                fontSize: "13px",
              }}
              color="success"
              onClick={addCustomer}
            >
              <AddIcon /> Add
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: "12px",
                fontSize: "13px",
              }}
              color="success"
              disabled={!selected[0]}
              onClick={editCustomer}
            >
              <EditIcon /> Edit
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: "12px",
                fontSize: "13px",
              }}
              color="success"
              disabled={!selected[0]}
              onClick={viewCustomer}
            >
              <VrpanoIcon /> view
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: "12px",
                fontSize: "13px",
              }}
              color="success"
              disabled={!selected[0]}
              onClick={handleConfDialog}
            >
              <DeleteIcon /> Delete
            </Button>
          </ButtonGroup>
        </Box>
        <Grid container>
          <Grid
            item
            lg={3}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="makeName-label">Make name</InputLabel>
              <Select
                disabled={loading}
                labelId="makeName-label"
                name="makeName"
                id="makeName"
                variant="outlined"
                label="Make name"
                //value={vehicleDetails.make_name}
                onChange={(event, key) => {
                  setSelectedMake(event.target.value);
                }}
                sx={{
                  backgroundColor: "#F1F1F1",

                  height: 50,
                }}
                fullWidth
              >
                {vehicleMakes.map((make, index) => (
                  <MenuItem key={make} value={make.make_id}>
                    {make.name_en}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            lg={3}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <FormControl sx={{ width: "100%" }} fullWidth variant="outlined">
              <InputLabel id="modelName-label">Model name</InputLabel>
              <Select
                disabled={loading}
                labelId="modelName-label"
                name="modelName"
                id="modelName"
                variant="outlined"
                label="Model Name"
                //value={vehicleDetails?.model_name}
                onChange={(event) => {
                  setSelectedModel(event.target.value);
                  const make_id = vehicleMakes.find(
                    (make) => make.make_id === selectedMake
                  )._id;
                  const model_id = vehicleModels.find(
                    (model) => model.name_en === event.target.value
                  )._id;
                  filterByVehicle(make_id, model_id);
                }}
                sx={{
                  backgroundColor: "#F1F1F1",
                  height: 50,
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
          <Grid
            item
            lg={3}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <TextField
              name="coustomerMobile"
              id="coustomerMobile"
              value={mobile}
              fullWidth
              onChange={(e) => {
                setMobile(e.target.value);
                filterByMobile(e.target.value);
              }}
              type="text"
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "#F1F1F1",
                  height: "50px",
                },
              }}
              variant="outlined"
              label="Filter customers by mobile"
            />
          </Grid>
          <Grid item lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: 50,
                paddingLeft: "10px",
              }}
            >
              <ButtonGroup>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "15px",
                    fontSize: "13px",
                  }}
                  color="success"
                  onClick={getAllCustomers}
                >
                  reset
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            lg={6}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <ListOfCustomers
              data={data}
              onRowSelect={(row) => {
                console.log(row);
                setSelected(row);
              }}
            />
          </Grid>
          <Grid
            item
            lg={6}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <ListOfVehicles data={vehicleData} />
          </Grid>
        </Grid>
      </Paper>
      <ConfirmationDialog
        ConfirmAction={deleteCustomer}
        confirmMsg={"Are You Sure You Want To Delete This Customer"}
        open={openConf}
        handleClose={handleConfDialog}
      />
    </Box>
  );
}
