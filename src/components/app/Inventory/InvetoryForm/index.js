import { Add, ArrowBackIos, CheckBox } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Input,
  Card,
  CardMedia,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../inventory.css";
import {
  addPart,
  editPart,
  getVehicleMakes,
  getVehicleModels,
} from "../../../../services/inventoryService";
import { showToasts } from "../../../toast";
import imageCompression from "browser-image-compression";
import { NumericFormat } from "react-number-format";
import FormButtonGroup from "../../../reusableComponents/FormButtonGroup/FormButtonGroup";
import { FieldWrapper, Title } from "../../customers/customerForm/CustomerForm";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { DEF_ACTIONS } from "../../../../utils/constants/actions";
import { getPartDetailsByBarcode } from "../../../../services/invoiceService";

const IMAGE_COMPRESS_FAIL = "Failed to upload the image.";

const itemDto = {
  itemId: "",
  itemName: "",
  barcodeNumber: "",
  country: "",
  brand: "",
  descriptions: [
    {
      description: "",
      title: "",
    },
  ],
  buyingPrice: 0,
  sellingPrice: 0,
  totalQuntity: 0,
  location: {
    room: "0",
    rack: "0",
    floor: "0",
  },
  vehicle: {
    make_id: "",
    makeId: "",
    modelId: "",
    makeName: "",
    makeCategoryId: "",
    modelName: "",
    year: "",
  },
  inventoryQuntity: 0,
  availableForOnlineSelling: false,
  onlineSellingQuntity: 0,
  onlinePrice: 0,
  image: "",
};

export default function InventoryItemAdd() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state?.data;
  console.log(data);
  const [inventoryItem, setinventoryItem] = useState(
    state?.action === DEF_ACTIONS.ADD ? itemDto : state?.data
  );
  const [vehicleMakes, setvehicleMakes] = useState([]);
  const [vehicleModels, setvehicleModels] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState(
    state?.action === DEF_ACTIONS.EDIT ? state?.data?.image : ""
  );

  useEffect(() => {
    const checkBarcodeExist = async () => {
      try {
        const response = await getPartDetailsByBarcode(
          inventoryItem?.barcodeNumber
        );
        console.log(response);

        if (response.status === 200 && response.data !== "") {
          showToasts("ERROR", "Barcode Number Is Used");
        }
      } catch (error) {
        console.error(error);
      }
    };
    setloading(true);

    state?.action === DEF_ACTIONS.ADD && checkBarcodeExist();
    setloading(false);
  }, [inventoryItem.barcodeNumber]);

  // get vehicle make name
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
    setloading(true);
    initVehicleMakes();
    setloading(false);
  }, []);

  useEffect(() => {
    const initVehicleModels = async () => {
      console.log(data?.vehicle?.makeId);
      try {
        const vehcleModelResponse = await getVehicleModels(
          state?.action === DEF_ACTIONS.EDIT
            ? state?.data?.vehicle?.make_id
            : inventoryItem?.vehicle?.make_id
        );
        setvehicleModels(vehcleModelResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    initVehicleModels();
  }, [inventoryItem.vehicle?.make_id]);

  const handleInventoryItemSubmit = async (e) => {
    setloading(true);

    const formdata = createFormData();

    try {
      console.log(formdata);
      if (state.action === DEF_ACTIONS.ADD) {
        const response = await addPart(formdata);
        if (response.status === 200) {
          setinventoryItem(itemDto);
          showToasts("SUCCESS", "Item has been added successfully");
        }
      }
      if (state?.action === DEF_ACTIONS.EDIT) {
        const response = await editPart(formdata);
        if (response.status === 200) {
          setinventoryItem(itemDto);
          showToasts("SUCCESS", "Item has been updated successfully");
        }
      }
    } catch (err) {
      console.error(err);
      showToasts("ERROR", "Part insert unsuccessfull");
    }
    setloading(false);
  };

  const handleOnChangeInput = (e) => {
    if (e.target.name === "availableForOnlineSelling") {
      if (!e.target.checked) {
        console.log(e.target.checked);
        setinventoryItem({
          ...inventoryItem,
          availableForOnlineSelling: false,
          inventoryQuntity: inventoryItem.totalQuntity,
          onlineSellingQuntity: 0,
          onlinePrice: 0,
        });
      } else {
        setinventoryItem({
          ...inventoryItem,
          [e.target.name]: true,
        });
      }
      return;
    }

    if (
      e.target.name === "room" ||
      e.target.name === "rack" ||
      e.target.name === "flor"
    ) {
      setinventoryItem((prev) => ({
        ...prev,
        location: { ...prev.location, [e.target.name]: e.target.value },
      }));
      return;
    }

    if (e.target.name === "makeName") {
      if (e.target.value === "none") {
        return;
      }
      setinventoryItem((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          makeName: e.target.value,
          makeId: vehicleMakes.find((make) => make.name_en === e.target.value)
            ._id,
          make_id: vehicleMakes.find((make) => make.name_en === e.target.value)
            .make_id,
        },
      }));
      return;
    }

    if (e.target.name === "modelName") {
      if (e.target.value === "none") {
        return;
      }
      setinventoryItem((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          modelName: e.target.value,
          modelId: vehicleModels.find(
            (model) => model.name_en === e.target.value
          )._id,
        },
      }));
      return;
    }

    if (e.target.name === "year" || e.target.name === "modelName") {
      setinventoryItem((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [e.target.name]: e.target.value,
        },
      }));
      return;
    }
    if (
      e.target.name === "totalQuntity" ||
      e.target.name === "sellingPrice" ||
      e.target.name === "buyingPrice"
    ) {
      if (e.target.value >= 0) {
        setinventoryItem({
          ...inventoryItem,
          [e.target.name]: e.target.value,
        });
      }
      return;
    }
    setinventoryItem({
      ...inventoryItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFields = () => {
    setinventoryItem({
      ...inventoryItem,
      descriptions: [
        ...inventoryItem.descriptions,
        { description: "", title: "" },
      ],
    });
    console.log("Updated inventoryItem:");
  };

  const handleRemoveFields = (index) => {
    let values = [...inventoryItem?.descriptions];
    values.splice(index, 1);
    setinventoryItem({ ...inventoryItem, descriptions: values });
    console.log("Updated inventoryItem:", {
      ...inventoryItem,
      descriptions: values,
    });
  };

  const handleOnChangeDescription = (index, event) => {
    const values = [...inventoryItem?.descriptions];
    console.log("values");
    if (event.target.name === "title") {
      values[index].title = event.target.value;
      setinventoryItem({ ...inventoryItem, descriptions: values });
      console.log(values);
    } else {
      values[index].description = event.target.value;
      setinventoryItem({ ...inventoryItem, descriptions: values });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 0.3,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      return IMAGE_COMPRESS_FAIL;
    }
  };

  const createFormData = () => {
    let compressedImage = "";
    // if (selectedFile) {
    //   compressedImage = await compressImage(selectedFile);
    //   if (compressedImage === IMAGE_COMPRESS_FAIL) {
    //     compressedImage = "";
    //     console.log("Image Compresson failed");
    //   }
    // }
    console.log(compressedImage);
    const formdata = new FormData();
    formdata.append("category", data?.name);
    formdata.append("itemId", inventoryItem.itemId);
    formdata.append("itemName", inventoryItem.itemName);
    formdata.append("barcodeNumber", inventoryItem.barcodeNumber);
    formdata.append("country", inventoryItem.country);
    formdata.append("brand", inventoryItem.brand);
    inventoryItem?.descriptions.forEach((item, index) => {
      formdata.append(`descriptions[${index}][title]`, item.title);
      formdata.append(`descriptions[${index}][description]`, item.description);
    });
    formdata.append("buyingPrice", inventoryItem.buyingPrice);
    formdata.append("sellingPrice", inventoryItem.sellingPrice);
    formdata.append("totalQuntity", inventoryItem.totalQuntity);
    formdata.append(`location[room]`, inventoryItem.location.room);
    formdata.append(`location[rack]`, inventoryItem.location.rack);
    formdata.append(`location[floor]`, inventoryItem.location.floor);
    formdata.append("makeId", inventoryItem.vehicle.makeId);
    formdata.append("makeName", inventoryItem.vehicle.makeName);
    formdata.append("makeCategoryId", inventoryItem.vehicle.makeCategoryId);
    formdata.append("modelName", inventoryItem.vehicle.modelName);
    formdata.append("year", inventoryItem.vehicle.year);
    formdata.append(
      "inventoryQuntity",
      inventoryItem.totalQuntity - inventoryItem.onlineSellingQuntity
    );
    formdata.append(
      "availableForOnlineSelling",
      inventoryItem.availableForOnlineSelling
    );
    formdata.append("onlineSellingQuntity", inventoryItem.onlineSellingQuntity);
    formdata.append("onlinePrice", inventoryItem.onlinePrice);
    formdata.append("categoryId", data.id);
    formdata.append(`vehicle[makeId]`, inventoryItem?.vehicle?.makeId);
    formdata.append(`vehicle[make_id]`, inventoryItem?.vehicle?.make_id);
    formdata.append(`vehicle[makeName]`, inventoryItem?.vehicle?.makeName);
    formdata.append(`vehicle[modelName]`, inventoryItem?.vehicle?.modelName);
    formdata.append("vehicle[modelId]", inventoryItem?.vehicle?.modelId);
    formdata.append(`vehicle[year]`, inventoryItem?.vehicle?.year);
    formdata.append("part_image", selectedFile);
    // formdata.append("file", selectedFile);
    return formdata;
  };

  return (
    <Box
      sx={{
        paddingX: 5,
        paddingTop: 10,
        width: "100%",
        fontFamily: "Poppins",
        backgroundColor: "rgb(229,228,226)",
      }}
    >
      <Paper
        elevation={2}
        style={{ borderRadius: 5, padding: 20, marginBottom: "20px" }}
      >
        <FormButtonGroup
          handleBack={goBack}
          action={state?.action}
          handleSubmit={handleInventoryItemSubmit}
        />
        <Grid container>
          <Title>Part Details</Title>
          <Grid item lg={3} md={4}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                id="itemId"
                label="Item ID"
                name="itemId"
                required
                variant="outlined"
                value={inventoryItem.itemId}
                onChange={handleOnChangeInput}
                margin="normal"
                sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3} md={4}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                variant="outlined"
                id="itemName"
                label="Item name"
                name="itemName"
                required
                value={inventoryItem.itemName}
                onChange={handleOnChangeInput}
                margin="normal"
                sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3} md={4}>
            <FieldWrapper>
              <TextField
                disabled={loading || state?.action === DEF_ACTIONS.EDIT}
                variant="outlined"
                id="BarcodeNumber"
                label="Barcode"
                required
                name="barcodeNumber"
                value={inventoryItem.barcodeNumber}
                onChange={handleOnChangeInput}
                margin="normal"
                sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={3} md={4}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                variant="outlined"
                id="brand"
                label="Brand"
                name="brand"
                required
                value={inventoryItem.brand}
                onChange={handleOnChangeInput}
                margin="normal"
                sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Title>Price Details</Title>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                variant="outlined"
                id="buyingPrice"
                label="Buying Price Rs"
                name="buyingPrice"
                value={inventoryItem.buyingPrice}
                onChange={handleOnChangeInput}
                margin="normal"
                type="number"
                style={{ backgroundColor: "#f5f7f7" }}
                size="small"
                inputProps={{ min: 0 }} // Set the minimum value to 0
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                variant="outlined"
                id="sellingPrice"
                label="Selling Price Rs"
                name="sellingPrice"
                value={inventoryItem.sellingPrice}
                onChange={handleOnChangeInput}
                margin="normal"
                type="number"
                style={{ backgroundColor: "#f5f7f7" }}
                inputProps={{ min: 0 }} // Set the minimum value to 0
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                variant="outlined"
                id="Quntity"
                label="Quantity"
                required
                name="totalQuntity"
                value={inventoryItem.totalQuntity}
                onChange={handleOnChangeInput}
                margin="normal"
                type="number"
                style={{ backgroundColor: "#f5f7f7" }}
                inputProps={{ min: 0 }} // Set the minimum value to 0
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={6}></Grid>
          <Grid item lg={6}>
            <Title>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={loading}
                    color="primary"
                    checked={inventoryItem.availableForOnlineSelling}
                    name="availableForOnlineSelling"
                    onChange={handleOnChangeInput}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Make available for online selling"
              ></FormControlLabel>
            </Title>
          </Grid>
          <Grid item lg={6}></Grid>

          {inventoryItem.availableForOnlineSelling && (
            <>
              <Grid item lg={2}>
                <FieldWrapper>
                  <TextField
                    disabled={loading}
                    variant="outlined"
                    id="onlineSellingQuntity"
                    name="onlineSellingQuntity"
                    label="Online selling quantity"
                    required
                    value={inventoryItem.onlineSellingQuntity}
                    onChange={(event) => {
                      if (event.target.value >= 0) {
                        handleOnChangeInput(event);
                      }
                    }}
                    margin="normal"
                    type="number"
                    style={{
                      marginLeft: 0,
                      backgroundColor: "#f5f7f7",
                    }}
                    inputProps={{ min: 0 }} // Set the minimum value to 0
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={2}>
                <FieldWrapper>
                  <TextField
                    disabled={loading}
                    variant="outlined"
                    id="onlinePrice"
                    required
                    name="onlinePrice"
                    label="Online selling price Rs"
                    value={inventoryItem.onlinePrice}
                    onChange={(event) => {
                      if (event.target.value >= 0) {
                        handleOnChangeInput(event);
                      }
                    }}
                    margin="normal"
                    type="number"
                    style={{ backgroundColor: "#f5f7f7" }}
                    inputProps={{ min: 0 }} // Set the minimum value to 0
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item lg={6}>
                <Card sx={{ height: 100, width: 100, marginLeft: "20px" }}>
                  <CardMedia
                    component="img"
                    sx={{}}
                    image={img}
                    height="auto"
                  />
                </Card>

                <Input
                  type="file"
                  onChange={handleFileChange}
                  sx={{ padding: "18px" }}
                />

                {parseInt(inventoryItem.totalQuntity) <
                  parseInt(inventoryItem.onlineSellingQuntity) && (
                  <InputLabel className="online-quantity-error">
                    Online selling quantity should be lower than total quantity
                  </InputLabel>
                )}
              </Grid>
            </>
          )}
          <Title>Description</Title>
          {inventoryItem?.descriptions?.map((inputField, index) => (
            <>
              <Grid item xs={4}>
                <FieldWrapper>
                  <TextField
                    fullWidth
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    label="title"
                    variant="outlined"
                    value={inputField.title}
                    onChange={(event) =>
                      handleOnChangeDescription(index, event)
                    }
                    sx={{ backgroundColor: "#f5f7f7", marginTop: "10px" }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid item xs={6}>
                <FieldWrapper>
                  <TextField
                    fullWidth
                    label="description"
                    variant="outlined"
                    type="text"
                    className="form-control"
                    id="description"
                    name="descriptions"
                    value={inputField.description}
                    onChange={(event) => {
                      handleOnChangeDescription(index, event);
                    }}
                    sx={{ backgroundColor: "#f5f7f7", marginTop: "10px" }}
                    size="small"
                  />
                </FieldWrapper>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <IconButton
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "15px",
                    margin: "10px",
                    background: "#f2bf07",
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.05)",
                      background: "#bd9504",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    if (index > 0) {
                      handleRemoveFields(index);
                    }
                  }}
                >
                  <RemoveCircleOutlineRoundedIcon />
                </IconButton>
                <IconButton
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "15px",
                    margin: "10px",
                    background: "#0598ed",
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.05)",
                      background: "#067dc2",
                      color: "white",
                    },
                  }}
                  onClick={() => handleAddFields()}
                >
                  <Add />
                </IconButton>
              </Grid>
            </>
          ))}
          <Title>Part location - Add exact part location in the store.</Title>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                id="room"
                label="Room"
                type="number"
                name="room"
                value={inventoryItem.location.room}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    handleOnChangeInput(event);
                  }
                }}
                margin="normal"
                style={{ backgroundColor: "#f5f7f7" }}
                inputProps={{ min: 0 }} // Set the minimum value to 0
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                id="rack"
                label="Rack"
                type="number"
                name="rack"
                value={inventoryItem.location.rack}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    handleOnChangeInput(event);
                  }
                }}
                margin="normal"
                style={{ backgroundColor: "#f5f7f7" }}
                inputProps={{ min: 0 }} // Set the minimum value to 0
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                id="flor"
                label="Floor"
                name="flor"
                type="number"
                value={inventoryItem.location.floor}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    handleOnChangeInput(event);
                  }
                }}
                margin="normal"
                style={{ backgroundColor: "#f5f7f7" }}
                inputProps={{ min: 0 }} // Set the minimum value to 0
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Title>
            Vehicle details - Fill here if the part is compatible only for a
            specific vehicle.
          </Title>
          <Grid item lg={3}>
            <FieldWrapper>
              <FormControl
                sx={{ width: "100%", marginTop: "15px" }}
                variant="outlined"
              >
                <InputLabel id="makeName-label">Make name</InputLabel>
                <Select
                  disabled={loading}
                  labelId="makeName-label"
                  name="makeName"
                  id="makeName"
                  variant="outlined"
                  value={inventoryItem?.vehicle?.makeName}
                  onChange={handleOnChangeInput}
                  sx={{
                    backgroundColor: "#f5f7f7",
                    marginRight: "10px",
                    height: "50px",
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="none" key="none">
                    <em>None</em>
                  </MenuItem>
                  {vehicleMakes.map((make, index) => (
                    <MenuItem key={index} value={make.name_en}>
                      {make.name_en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <FormControl sx={{ width: "100%", marginTop: "15px" }}>
                <InputLabel id="makeName-label">Model name</InputLabel>
                <Select
                  //disabled={loading}
                  labelId="Model Name"
                  name="modelName"
                  id="modelName"
                  variant="outlined"
                  value={inventoryItem?.vehicle?.modelName}
                  onChange={handleOnChangeInput}
                  sx={{
                    backgroundColor: "#f5f7f7",
                    marginRight: "10px",
                    height: "50px",
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                >
                  {vehicleModels.map((make, index) => (
                    <MenuItem key={index} value={make.name_en}>
                      {make.name_en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FieldWrapper>
          </Grid>
          <Grid item lg={3}>
            <FieldWrapper>
              <TextField
                disabled={loading}
                id="year"
                label="Year"
                name="year"
                type="number"
                value={inventoryItem?.vehicle?.year}
                onChange={(event) => {
                  if (event.target.value >= 0) {
                    handleOnChangeInput(event);
                  }
                }}
                margin="normal"
                sx={{
                  backgroundColor: "#f5f7f7",
                }}
                fullWidth
                size="small"
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
