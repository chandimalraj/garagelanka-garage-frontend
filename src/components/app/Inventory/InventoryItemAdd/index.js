import { ArrowBackIos, CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  MenuItem,
  Select,
  Input,
  Card,
  CardMedia,
} from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddIcon from "@mui/icons-material/Add";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../inventory.css";
import {
  addPart,
  editPart,
  getAllPartByCategoryId,
  getVehicleMakes,
  getVehicleModels,
} from "../../../../services/inventoryService";
import { showToasts } from "../../../toast";
import ConfirmationDialog from "../../../confirmation/ConfirmationDialog";
import imageCompression from "browser-image-compression";
import { NumericFormat } from "react-number-format";

const IMAGE_COMPRESS_FAIL = "Failed to upload the image.";

const useStyles = () => ({
  formControl: {
    margin: "8px",
    minWidth: 120,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: "8px",
    position: "relative",
  },
  partdetails: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 5,
  },
  topic_test: {
    color: "#1B74E4",
    marginLeft: 10,
  },
  topic_test_1: {
    padding: 5,
  },
  mainheadertopic: {
    padding: 10,
  },
  accordion: {
    backgroundColor: "#E4F1FF",
  },
  descriptionBtn: {
    margin: 2,
    height: 25,
    backgroundColor: "#1B74E4",
    fontWeight: 900,
    color: "white",
    "&:hover": {
      backgroundColor: "#1B74E4",
      color: "white",
    },
    "&:disabled": {
      display: "none",
    },
  },
  descriptionBox: {
    marginTop: "0px !important",
    marginBottom: 8,
    marginLeft: "-5px !important",
  },
  AddNewBtn: {
    backgroundColor: "#05C148 !important",
    fontWeight: "700 !important",
    color: "white !important",
    width: "150px",
    height: "40px",
    marginTop: "30px",
    textAlign: "end",
    "&:disabled": {
      backgroundColor: "gray !important",
    },
  },
  resetBtn: {
    backgroundColor: "gray !important",
    fontWeight: "700 !important",
    color: "white !important",
    width: "150px",
    height: "40px",
    marginTop: "30px",
    marginRight: "10px",
    textAlign: "end",
    "&:disabled": {
      backgroundColor: "gray !important",
    },
  },
});

const initialItem = {
  itemId: "",
  itemName: "",
  barcodeNumber: "",
  country: "",
  brand: "",
  description: {},
  buyingPrice: 0,
  sellingPrice: 0,
  totalQuntity: 0,
  location: {
    room: "0",
    rack: "0",
    flor: "0",
  },
  vehicle: {
    makeId: "",
    makeName: "",
    makeCategoryId: "",
    modelName: "",
    year: "",
  },
  inventoryQuntity: 0,
  availableForOnlineSelling: false,
  onlineSellingQuntity: 0,
  onlinePrice: 0,
};

export default function InventoryItemAdd() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const classes = useStyles();

  const [inventoryItem, setinventoryItem] = useState(initialItem);
  const [vehicleMakes, setvehicleMakes] = useState([]);
  const [vehicleModels, setvehicleModels] = useState([]);
  const [accordianExpansion, setaccordianExpansion] = useState({
    locationPanel: false,
    vehicleDetailsPanel: false,
  });
  const [loading, setloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState();

  const [description, setDescription] = useState([
    { title: "", description: "" },
  ]);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    const edit = data.isEdit;
    const inventory = location.state.inventory;

    // when editing
    if (edit) {
      setEdit(true);
      setinventoryItem(inventory);
      setDescription(inventory.description);
    }
  }, []);

  useEffect(() => {
    const checkBarcodeExist = async () => {
      try {
        // const result = await checkBarcodeExist(inventoryItem.barcodeNumber);
        // if (result.data.is_exists) {
        //   alert("Entered barcode already exists");
        //   setinventoryItem({ ...inventoryItem, barcodeNumber: "" });
        // }
      } catch (error) {
        console.error(error);
      }
    };
    setloading(true);
    if (isEdit) {
      setloading(false);
      return;
    }
    checkBarcodeExist();
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
      try {
        const vehcleModelResponse = await getVehicleModels(
          inventoryItem.vehicle.makeCategoryId
        );

        setvehicleModels(vehcleModelResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    initVehicleModels();
  }, [inventoryItem.vehicle.makeId]);

  const handleOnReset = () => {
    setinventoryItem(initialItem);
    setDescription([{ title: "", description: "" }]);
    setImg(null);
  };

  const handleInventoryItemSubmit = async (e) => {
    setloading(true);
    // e.preventDefault();

    let compressedImage = "";
    if (selectedFile) {
      compressedImage = await compressImage(selectedFile);
      if (compressedImage === IMAGE_COMPRESS_FAIL) {
        //notify to upload image later
        compressedImage = "";
        console.log("Image Compresson failed");
      }
      console.log(compressedImage);
    }

    if (!isEdit) {
      const initialItem = {
        itemId: "",
        itemName: "",
        barcodeNumber: "",
        country: "",
        brand: "",
        description: {},
        buyingPrice: 0,
        sellingPrice: 0,
        totalQuntity: 0,
        location: {
          room: "0",
          rack: "0",
          flor: "0",
        },
        vehicle: {
          makeId: "",
          makeName: "",
          makeCategoryId: "",
          modelName: "",
          year: "",
        },
        inventoryQuntity: 0,
        availableForOnlineSelling: false,
        onlineSellingQuntity: 0,
        onlinePrice: 0,
      };
      const itemToBeAdded = {
        ...inventoryItem,
        categoryId: data.id,
        inventoryQuntity:
          inventoryItem.totalQuntity - inventoryItem.onlineSellingQuntity,
        description: description,
      };
      function jsonBlob(obj) {
        return new Blob([JSON.stringify(obj)], {
          type: "application/json",
        });
      }

      const formdata = new FormData();
      formdata.append("itemId", inventoryItem.itemId);
      formdata.append("itemName", inventoryItem.itemName);
      formdata.append("barcodeNumber", inventoryItem.barcodeNumber);
      formdata.append("country", inventoryItem.country);
      formdata.append("brand", inventoryItem.brand);
      formdata.append("description", inventoryItem.description);
      formdata.append("buyingPrice", inventoryItem.buyingPrice);
      formdata.append("sellingPrice", inventoryItem.sellingPrice);
      formdata.append("totalQuntity", inventoryItem.totalQuntity);
      formdata.append("room", inventoryItem.location.room);
      formdata.append("rack", inventoryItem.location.rack);
      formdata.append("flor", inventoryItem.location.flor);
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
      formdata.append(
        "onlineSellingQuntity",
        inventoryItem.onlineSellingQuntity
      );
      formdata.append("onlinePrice", inventoryItem.onlinePrice);
      formdata.append("categoryId", data.id);
      formdata.append("description", data.description);
      formdata.append("categoryId", data.id);

      description.map((item,index)=>(
        formdata.append("title" + index , item.description)
      ))

      formdata.append("part_image", compressedImage);
      try {
        // const data = jsonBlob(itemToBeAdded);
        // const dataString = String(data);
        // console.log(data);
        // formdata.append("data", data);
        
        console.log(formdata);
        const addItemResponse = await addPart(formdata);
        setinventoryItem(initialItem);
        setDescription([{ title: "", description: "" }]);
        showToasts("SUCCESS", "Item has been added successfully");
        window.history.back();
        // history.goBack();
      } catch (err) {
        console.error(err);
        alert("An error occurred while adding item to the inventory!");
      }
    } else {
      const itemToBeAdded = {
        ...inventoryItem,
        inventoryQuntity:
          inventoryItem.totalQuntity - inventoryItem.onlineSellingQuntity,
        description: description,
      };

      try {
        const addItemResponse = await editPart(itemToBeAdded);
        setinventoryItem(initialItem);
        setDescription([{ title: "", description: "" }]);
        showToasts("SUCCESS", "Item has been edited successfully");
        window.history.back();
        // navigate('/inventory')
        // history.goBack();
      } catch (err) {
        console.error(err);
        alert("An error occurred while editing item to the inventory!");
      }
    }

    setloading(false);
  };

  const validateItemFields = () => {
    const requiredFields = [
      "itemId",
      "itemName",
      "barcodeNumber",
      "totalQuntity",
      "availableForOnlineSelling",
      // "vehicle",
      "onlineSellingQuntity",
    ];
    console.log(inventoryItem);
    for (let [field, value] of Object.entries(inventoryItem)) {
      if (requiredFields.includes(field)) {
        // console.log(requiredFields.includes(field))
        if (typeof value === "string" && value.trim() === "") return false;
        if (field === "totalQuntity" && value <= 0) {
          return false;
        }

        if (field === "onlineSellingQuntity" && value) {
          console.log(
            Number(inventoryItem.totalQuntity) <
              Number(inventoryItem.onlineSellingQuntity)
          );
          if (
            Number(inventoryItem.totalQuntity) <
            Number(inventoryItem.onlineSellingQuntity)
          ) {
            return false;
          }
        }

        // check required fields for online selling
        if (field === "availableForOnlineSelling" && value) {
          if (
            inventoryItem.onlineSellingQuntity <= 0 ||
            inventoryItem.onlinePrice <= 0
          )
            return false;
        }
      }
    }
    return true;
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
          makeCategoryId: vehicleMakes.find(
            (make) => make.name_en === e.target.value
          ).make_id,
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

    setinventoryItem({
      ...inventoryItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFields = () => {
    const values = [...description];
    values.push({ title: "", description: "" });
    setDescription(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...description];
    values.splice(index, 1);
    setDescription(values);
  };

  const handleOnChangeDescription = (index, event) => {
    const values = [...description];
    if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else {
      values[index].description = event.target.value;
    }
    setDescription(values);
  };

  const [items, setItems] = useState([]);

  const cellStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const goBack = () => {
    navigate("/inventory/" + data.id, { state: data });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    setSelectedFile(selectedFile);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 0.5,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      return IMAGE_COMPRESS_FAIL;
    }
  };

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange(values.value);
        }}
        thousandSeparator={true}
        allowNegative={false}
        allowLeadingZeros={false}
        format="###,###,###"
        name=""
      />
    );
  }

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
        style={{ borderRadius: 5, padding: 5, marginBottom: "20px" }}
      >
        <Box display="flex" alignItems="center" sx={{ marginBottom: 5 }}>
          <Grid container style={{ marginLeft: 15 }}>
            <Grid item xs={6}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    paddingTop: "6px",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    variant="contained"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "15px",
                      margin: "10px",
                      background: "#a1a5a9",
                      "&:hover": {
                        opacity: 1,
                        transform: "scale(1.05)",
                        background: "#2d2e2f",
                        color: "white",
                      },
                    }}
                    onClick={goBack}
                  >
                    <KeyboardBackspaceRoundedIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    style={{
                      textTransform: "uppercase",
                      color: "#616161",
                      fontSize: 20,
                      fontWeight: "600",
                      marginRight: "10px",
                    }}
                  >
                    Category -
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      textTransform: "uppercase",
                      color: "#a1a5a9",
                      fontSize: 20,
                      fontWeight: "800",
                    }}
                  >
                    {data.name} parts
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
        <Box className={classes.partdetails}>
          <div
            noValidate
            autoComplete="off"
            // onSubmit={handleInventoryItemSubmit}
          >
            <Box m={3}>
              <Typography
                variant="h6"
                align="left"
                sx={{
                  fontFamily: "Poppins",
                }}
              >
                Part details
              </Typography>

              <Box>
                <Grid container spacing={2}>
                  <Grid item lg={3} md={4}>
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
                      style={{ margin: 8 }}
                    />
                  </Grid>
                  <Grid item lg={3} md={4}>
                    <TextField
                      disabled={loading}
                      variant="outlined"
                      id="itemName"
                      label="Item name"
                      name="itemName"
                      value={inventoryItem.itemName}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      style={{ margin: 8 }}
                      sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                    />
                  </Grid>
                  <Grid item lg={3} md={4}>
                    <TextField
                      disabled={loading}
                      variant="outlined"
                      id="BarcodeNumber"
                      label="Barcode"
                      required
                      name="barcodeNumber"
                      value={inventoryItem.barcodeNumber}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      style={{ margin: 8 }}
                      sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                    />
                  </Grid>
                  <Grid item lg={3} md={4}>
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
                      style={{ margin: 8 }}
                      sx={{ backgroundColor: "#f5f7f7", width: "100%" }}
                    />
                  </Grid>
                </Grid>

                {/* <TextField
                  disabled={loading}
                  variant="outlined"
                  id="country"
                  label="Country"
                  name="country"
                  value={inventoryItem.country}
                  onChange={handleOnChangeInput}
                  margin="normal"
                  style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                /> */}
              </Box>
            </Box>

            <Box m={3}>
              <Typography
                variant="h6"
                align="left"
                className={classes.topic_test}
                sx={{
                  fontFamily: "Poppins",
                }}
              >
                Price
              </Typography>

              <Box>
                <TextField
                  disabled={loading}
                  variant="outlined"
                  id="buyingPrice"
                  label="Buying price"
                  name="buyingPrice"
                  value={inventoryItem.buyingPrice}
                  onChange={handleOnChangeInput}
                  margin="normal"
                  type="number"
                  style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                  // InputProps={{
                  //   inputComponent: NumberFormatCustom,
                  // }}
                />
                <TextField
                  disabled={loading}
                  variant="outlined"
                  id="sellingPrice"
                  label="Selling price"
                  name="sellingPrice"
                  value={inventoryItem.sellingPrice}
                  onChange={handleOnChangeInput}
                  margin="normal"
                  type="number"
                  style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                />
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
                  style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                />
              </Box>
            </Box>

            <Box m={3} paddingLeft={1}>
              <Box>
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
              </Box>

              {inventoryItem.availableForOnlineSelling && (
                <>
                  <Box>
                    <TextField
                      disabled={loading}
                      variant="outlined"
                      id="onlineSellingQuntity"
                      name="onlineSellingQuntity"
                      label="Online selling quantity"
                      required
                      value={inventoryItem.onlineSellingQuntity}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      type="number"
                      style={{
                        margin: 8,
                        marginLeft: 0,
                        backgroundColor: "#f5f7f7",
                      }}
                    />
                    <TextField
                      disabled={loading}
                      variant="outlined"
                      id="onlinePrice"
                      required
                      name="onlinePrice"
                      label="Online selling price"
                      value={inventoryItem.onlinePrice}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      type="number"
                      style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                    />
                    <Typography
                      variant="h6"
                      align="left"
                      className={classes.topic_test}
                      sx={{
                        fontFamily: "Poppins",
                        marginTop: "30px",
                      }}
                    >
                      Part Image
                    </Typography>
                    <Card sx={{ height: 140, width: 140, marginTop: 3 }}>
                      <CardMedia
                        component="img"
                        sx={{}}
                        image={img}
                        height="auto"
                      />
                    </Card>
                    {/* <input
                                style={{ opacity: "1", width: "10px", height: "10px" }}
                                id="img-input"
                                type="file"
                                onChange={(e) => {
                                  handleFileChange(e);
                                }}
                            /> */}
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      sx={{ marginTop: "20px", padding: "18px" }}
                    />
                  </Box>
                  {parseInt(inventoryItem.totalQuntity) <
                    parseInt(inventoryItem.onlineSellingQuntity) && (
                    <InputLabel className="online-quantity-error">
                      Online selling quantity should be lower than total
                      quantity
                    </InputLabel>
                  )}
                </>
              )}
            </Box>

            <Box m={4}>
              <Typography
                variant="h6"
                align="left"
                className={classes.topic_test}
                sx={{
                  fontFamily: "Poppins",
                  marginBottom: "10px",
                }}
              >
                Description
              </Typography>

              {description.map((inputField, index) => (
                <Grid
                  container
                  key={`${inputField}~${index}`}
                  className={classes.descriptionBox}
                  spacing={2}
                >
                  <Grid item xs={4}>
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="description"
                      variant="outlined"
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={inputField.description}
                      onChange={(event) => {
                        if (index > 0) {
                          handleOnChangeDescription(index, event);
                        }
                      }}
                      sx={{ backgroundColor: "#f5f7f7", marginTop: "10px" }}
                    />
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
                      <RemoveRoundedIcon />
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
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Box>

            <Box m={4}>
              <Accordion
                expanded={accordianExpansion.locationPanel}
                onChange={(e, expanded) =>
                  setaccordianExpansion((prev) => ({
                    ...prev,
                    locationPanel: expanded,
                  }))
                }
                style={{ marginTop: 15 }}
                className={classes.accordion}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="locationPanel-content"
                  id="locationPanel-header"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Poppins",
                        }}
                      >
                        Part location - Add exact part location in the store.
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <TextField
                      disabled={loading}
                      id="room"
                      label="Room"
                      type="number"
                      name="room"
                      value={inventoryItem.location.room}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                    />
                    <TextField
                      disabled={loading}
                      id="rack"
                      label="Rack"
                      type="number"
                      name="rack"
                      value={inventoryItem.location.rack}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                    />
                    <TextField
                      disabled={loading}
                      id="flor"
                      label="Floor"
                      name="flor"
                      type="number"
                      value={inventoryItem.location.flor}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      style={{ margin: 8, backgroundColor: "#f5f7f7" }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={accordianExpansion.vehicleDetailsPanel}
                onChange={(e, expanded) =>
                  setaccordianExpansion((prev) => ({
                    ...prev,
                    vehicleDetailsPanel: expanded,
                  }))
                }
                style={{ marginTop: 15 }}
                className={classes.accordion}
              >
                <AccordionSummary
                  aria-controls="vehicleDetailsPanel-content"
                  id="vehicleDetailsPanel-header"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        className={classes.topic_test_1}
                        sx={{
                          fontFamily: "Poppins",
                        }}
                        variant="h6"
                      >
                        Vehicle details - Fill here if the part is compatible
                        only for a specific vehicle.
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControl>
                      <InputLabel id="makeName-label">Make name</InputLabel>
                      <Select
                        disabled={loading}
                        labelId="makeName-label"
                        name="makeName"
                        id="makeName"
                        value={inventoryItem.vehicle.makeName}
                        onChange={handleOnChangeInput}
                        sx={{
                          width: "200px",
                          backgroundColor: "#f5f7f7",
                          marginRight: "10px",
                        }}
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

                    <FormControl>
                      <InputLabel id="makeName-label">Model name</InputLabel>
                      <Select
                        disabled={loading}
                        labelId="Model Name"
                        name="modelName"
                        id="modelName"
                        value={inventoryItem.vehicle.modelName}
                        onChange={handleOnChangeInput}
                        sx={{
                          width: "200px",
                          backgroundColor: "#f5f7f7",
                          marginRight: "10px",
                        }}
                      >
                        {vehicleModels.map((make, index) => (
                          <MenuItem key={index} value={make.name_en}>
                            {make.name_en}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      disabled={loading}
                      id="year"
                      label="Year"
                      name="year"
                      type="number"
                      value={inventoryItem.vehicle.year}
                      onChange={handleOnChangeInput}
                      margin="normal"
                      sx={{
                        width: "200px",
                        backgroundColor: "#f5f7f7",
                        margin: "0px",
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box
              display="flex"
              component="div"
              alignItems="center"
              justifyContent="center"
              p={2}
            >
              <Button
                variant="contained"
                color="primary"
                type="reset"
                onClick={handleOnReset}
                sx={{
                  backgroundColor: "#d6a10d",
                  marginRight: "30px",
                  width: "150px",
                  "&:hover": {
                    opacity: 1,
                    transform: "scale(1.05)",
                    background: "#ab8009",
                    color: "white",
                  },
                }}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!validateItemFields()}
                sx={{
                  backgroundColor: "#0be02b",
                  width: "150px",
                  "&:hover": {
                    opacity: 1,
                    transform: "scale(1.05)",
                    background: "#0abf25",
                    color: "white",
                  },
                }}
                onClick={handleInventoryItemSubmit}
              >
                {data.isEdit ? "Edit" : "Add"}
              </Button>
              <div style={{ width: "100px" }}>
                {loading && (
                  <CircularProgress size={24} sx={{ marginLeft: "30px" }} />
                )}
              </div>
            </Box>
          </div>
        </Box>
      </Paper>
    </Box>
  );
}
