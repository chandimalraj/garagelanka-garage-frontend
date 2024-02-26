import { ArrowBackIos, CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../inventory.css";
import {
  getAllPartByCategoryId,
  removePart,
} from "../../../../services/inventoryService";
import { useRef } from "react";
import ConfirmationDialog from "../../../confirmation/ConfirmationDialog";
import { showToasts } from "../../../toast";

export default function Inventorytype() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const gridRef = useRef();
  const [repopulate, setRepopulate] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDlg, setOpenDlg] = useState(false);
  const [msg, setMsg] = useState("");

  const cellStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [columnDefs] = useState([
    {
      field: "itemId",
      headerName: "Item ID",
      width: 100,

      cellStyle: cellStyle,
    },
    {
      field: "itemName",
      headerName: "Item Name",
      width: 100,
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: `location`,
      headerName: "room , rack , floor",
      width: 150,
      flex: 1,
      cellRenderer: (params) => {
        return (
          <div>
            {params.value.room} {params.value.rack} {params.value.flor}
          </div>
        );
      },
      cellStyle: cellStyle,
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: "sellingPrice",
      headerName: "Selling Price",
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: "totalQuntity",
      headerName: "Inventory Quantity",
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: "onlineSellingQuntity",
      headerName: "Online Selling Quantity",
      flex: 1,
      cellStyle: cellStyle,
    },
    {
      field: "availableForOnlineSelling",
      headerName: "Online Selling ",
      flex: 1,
      cellStyle: cellStyle,
      cellRenderer: (data) => {
        return data.value ? (
          <CheckBox color="success" />
        ) : (
          <CheckBoxOutlineBlankIcon />
        );
      },
    },
  ]);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    setSelectedRow(selectedRows[0]);
  }, []);

  useEffect(() => {
    const getParts = async () => {
      try {
        const response = await getAllPartByCategoryId(data.id);
        console.log(response);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getParts();
  }, [repopulate]);

  const goBack = () => {
    navigate("/inventory");
  };

  const itemAdd = () => {
    const dataObject = { ...data, isEdit: false, inventory: null };
    navigate("/inventory/add_item", { state: dataObject });
  };
  const itemEdit = () => {
    const dataObject = { ...data, isEdit: true, inventory: selectedRow };
    navigate("/inventory/add_item", { state: dataObject });
  };

  const deletePart = async () => {
    try {
      const response = await removePart(selectedRow.barcodeNumber);
      if (response.status == 200) {
        setOpenDlg(false);
        setRepopulate(null);
        showToasts("SUCCESS", "Part removed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (e) => {
    setMsg("Are you sure you want to remove this part");
    setOpenDlg(true);
  };
  const handleDialogClose = () => {
    setOpenDlg(false);
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
      <Paper elevation={2} style={{ borderRadius: 5, padding: 5 }}>
        <Box display="flex" alignItems="center" sx={{ marginBottom: 5 }}>
          <Grid container style={{ marginLeft: 15 }}>
            <Grid item xs={6}>
              <Box>
                <Box></Box>
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
                      //background: "#a1a5a9",
                      color: "#e5e4e2",
                      backgroundColor: "#2b2a2a",
                      transition: "",
                      "&:hover": {
                        backgroundColor: "black", // Change this value to your desired hover background color
                      },
                      // "&:hover": {
                      //   opacity: 1,
                      //   transform: "scale(1.05)",
                      //   background: "#2d2e2f",
                      //   color: "white",
                      // },
                    }}
                    onClick={goBack}
                  >
                    <KeyboardBackspaceRoundedIcon  />
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
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingTop: "6px",
                  alignItems: "center",
                }}
              >
                <IconButton
                  variant="contained"
                  sx={{
                    // display: "flex",
                    // justifyContent: "center",
                    // fontSize: "15px",
                    margin: "10px",
                    //background: "#0fa83b",
                    color: "#e5e4e2",
                    backgroundColor: "#09B144",
                    // transition: "",
                    "&:hover": {
                      backgroundColor: "black", // Change this value to your desired hover background color
                    },

                    // "&:hover": {
                    //   opacity: 1,
                    //   transform: "scale(1.05)",
                    //   background: "#0a6324",
                    //   color: "white",
                    // },
                  }}
                  onClick={itemAdd}
                >
                  <AddCircleOutlineRoundedIcon  />
                </IconButton>
                <IconButton
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "15px",
                    margin: "10px",
                    //background: "#e0c619",
                    color: "#e5e4e2",
                    backgroundColor: "#0D7BCF",
                    transition: "",
                    "&:hover": {
                      backgroundColor: "black", // Change this value to your desired hover background color
                    },

                    // "&:hover": {
                    //   opacity: 1,
                    //   transform: "scale(1.05)",
                    //   background: "#877708",
                    //   color: "white",
                    // },
                  }}
                  disabled={selectedRow == null}
                  onClick={itemEdit}
                >
                  <EditNoteRoundedIcon  />
                </IconButton>
                <IconButton
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "15px",
                    margin: "10px",
                   // background: "#f51818",
                   color: "#e5e4e2",
                   backgroundColor: "#D70B0B",
                   transition: "",
                   "&:hover": {
                     backgroundColor: "black", // Change this value to your desired hover background color
                   },

                    // "&:hover": {
                    //   opacity: 1,
                    //   transform: "scale(1.05)",
                    //   background: "#a31d1d",
                    //   color: "white",
                    // },
                  }}
                  disabled={selectedRow == null}
                  onClick={handleDelete}
                >
                  <HighlightOffRoundedIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box sx={{ height: "500px", margin: "10px" }}>
            <div style={gridStyle} className="ag-theme-balham">
              <AgGridReact
                ref={gridRef}
                rowData={items}
                columnDefs={columnDefs}
                rowSelection={"single"}
                animateRows={true}
                pagination={true}
                onSelectionChanged={onSelectionChanged}
                suppressExcelExport={true}
                gridOptions={{ rowHeight: 60 }}
                rowStyle={{
                  background: "rgb(245,247,247)",
                  fontFamily: "Roboto",
                }}
                suppressCellFocus={true}
              ></AgGridReact>
            </div>
          </Box>
        </Box>
      </Paper>
      <ConfirmationDialog
        confirmMsg={msg}
        open={openDlg}
        setConfirmDialog={setOpenDlg}
        ConfirmAction={deletePart}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}
