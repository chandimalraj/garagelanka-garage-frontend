/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { showToasts } from "../../toast";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";
import ListOfExpenses from "./listOfServiceTypes/ListOfServiceTypes";
import {
  deleteExpenseById,
  getExpenses,
} from "../../../services/expensesService";
import {
  addServiceTypeToServiceCenter,
  deleteServiceType,
  getAllServiceTypes,
  getServiceTypesByServiceCenter,
  updateServiceType,
} from "../../../services/serviceTypesService";

export default function ServiceTypeList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const [openConf, setOpenConf] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [formData, setFormData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllRegisteredServiceTypes();
    getAllServices();
  }, []);

  const getAllRegisteredServiceTypes = async () => {
    try {
      const response = await getServiceTypesByServiceCenter();
      console.log(response);
      setData(response.data?.servicesOffered);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllServices = async () => {
    try {
      const response = await getAllServiceTypes();
      console.log(response);
      setServiceTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addServiceType = async () => {
    //console.log(formData);
    let data = {serviceoffers:[]}
    data.serviceoffers.push(formData)
    console.log(data)
    try {
      const response = await addServiceTypeToServiceCenter(data);
      console.log(response)
      getAllRegisteredServiceTypes()
      setFormData({})
      if (response.status === 200) {
        showToasts("SUCCESS", "Service Added Successfully!");
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Error Occured");
    }
  };

  const editServiceType = async () => {
    //console.log(formData);
    let data = {serviceoffers:[]}
    data.serviceoffers.push(formData)
    console.log(data)
    try {
      const response = await updateServiceType(data);
      console.log(response)
      // setFormData({})
      getAllRegisteredServiceTypes()
      if (response.status === 200) {
        showToasts("SUCCESS", "Service Updated Successfully!");
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Error Occured");
    }
  };


  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const removeServiceType = async () => {
    try {
      const response = await deleteServiceType(selected[0]);
      if (response.status === 200) {
        showToasts("SUCCESS", "Service Deleted Successfully");
        handleConfDialog();
        getAllRegisteredServiceTypes();
      }
    } catch (error) {
      console.log(error);
      handleConfDialog();
      showToasts("ERROR", "Service Deletion Unsuccessfull");
    }
  };

  const handleConfDialog = () => {
    setOpenConf(!openConf);
  };

  const handleRowClick = (id)=>{
     const filteredData = data.find((type)=>type._id === id)
     setFormData(filteredData)
  }

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
              onClick={addServiceType}
              disabled ={selected.length > 0}
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
              disabled={selected.length !== 1}
              onClick={editServiceType}
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
              disabled={selected.length !== 1}
              onClick={handleConfDialog}
            >
              <DeleteIcon /> Delete
            </Button>
          </ButtonGroup>
          <Autocomplete
            freeSolo
            options={serviceTypes}
            // inputValue={inputValue}
            // onInputChange={handleInputChange}
            disabled ={selected.length > 0}
            value={formData}
            onChange={(event, newValue) => {
              console.log(newValue)
              handleChange(newValue._id, "serviceTypeId");
              handleChange(newValue.serviceTypeName, "serviceTypeName");
              handleChange(newValue.colorCode, "colorCode");
              handleChange(newValue.serviceTypeimageURL, "serviceTypeimageURL");
              // setFormData({...data , ...newValue})
              // setFormData({...data , ...newValue})
            }}
            getOptionLabel={(i) => `${i.serviceTypeName}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service type"
                variant="outlined"
                fullWidth
              />
            )}
            sx={{
              "& .MuiInputBase-root": {
                // borderRadius: "8px",
                backgroundColor: "#F1F1F1",
              },
              marginTop: "10px",
              width: "350px",
              marginLeft: "10px",
            }}
            size="small"
          />
          <TextField
            name="requiredTimeSlots"
            id="requiredTimeSlots"
            value={formData?.requiredTimeSlots || ""}
            fullWidth
            // disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "requiredTimeSlots")
            }
            type="number"
            sx={{
              "& .MuiInputBase-root": {
                // borderRadius: "8px",
                backgroundColor: "#F1F1F1",
              },
              marginTop: "10px",
              width: "200px",
              marginLeft: "10px",
            }}
            size="small"
            variant="outlined"
            label="Time Slots"
          />
          <TextField
            name="maximumParallel"
            id="maximumParallel"
            value={formData?.maximumParallel || ""}
            fullWidth
            // disabled={state?.action === DEF_ACTIONS.VIEW}
            onChange={(e) =>
              handleChange(e?.target?.value || "", "maximumParallel")
            }
            type="number"
            sx={{
              "& .MuiInputBase-root": {
                // borderRadius: "8px",
                backgroundColor: "#F1F1F1",
              },
              marginTop: "10px",
              width: "200px",
              marginLeft: "10px",
            }}
            size="small"
            variant="outlined"
            label="Maximum Parallel"
          />
        </Box>
        <Grid container>
          <Grid
            item
            lg={12}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <ListOfExpenses
              data={data}
              onRowSelect={(row) => {
                console.log(row);
                setSelected(row);
                handleRowClick(row[0])
                //printInvoice(row);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <ConfirmationDialog
        ConfirmAction={removeServiceType}
        confirmMsg={"Are You Sure You Want To Delete This Service Type"}
        open={openConf}
        handleClose={handleConfDialog}
      />
    </Box>
  );
}
