import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import ListOfItems from "../listOfItems/ListOfItems";
import BackButton from "../../../reusableComponents/BackButton/BackButton";
import ActionButtonGroup from "../../../reusableComponents/ButtonGroup/ActionButtonGroup";
import { DEF_ACTIONS } from "../../../../utils/constants/actions";
import { Category } from "@mui/icons-material";

export default function Inventorytype() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data)
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
 
  const [repopulate, setRepopulate] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selected, setSelected] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const [msg, setMsg] = useState("");

  // const onSelectionChanged = useCallback(() => {
  //   const selectedRows = gridRef.current.api.getSelectedRows();
  //   console.log(selectedRows);
  //   setSelectedRow(selectedRows[0]);
  // }, []);

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
    navigate("/inventory/add_item", {
      state: { data: dataObject, action: DEF_ACTIONS.ADD,category:{
         
      }},
    });
  };
  const itemEdit = () => {
    // const dataObject = { ...data, isEdit: true, inventory: selectedRow };
    const item = items.find((item,index)=>item._id === selected[0])
    navigate("/inventory/edit_item", {
      state: { data: item, action: DEF_ACTIONS.EDIT },
    });
  };

  const deletePart = async () => {
    try {
      const response = await removePart(selectedRow.barcodeNumber);
      if (response.status === 200) {
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
      <Paper
        elevation={2}
        style={{ borderRadius: 5, paddingLeft: "20px", paddingTop: "10px" }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <Box
              sx={{
                display: "flex",
                paddingTop: "6px",
                alignItems: "center",
              }}
            >
              <BackButton goBack={goBack} sx={{ width: "200px" }} />

              <Typography
                variant="h6"
                style={{
                  textTransform: "uppercase",
                  color: "#a1a5a9",
                  fontSize: 20,
                  fontWeight: "800",
                  marginLeft: "10px",
                }}
              >
                {data.name}
              </Typography>
            </Box>

            <ActionButtonGroup
              handleAdd={itemAdd}
              handleEdit={itemEdit}
              handleDelete={handleDelete}
              selectedItemsLength={selected.length}
            />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              height: "500px",
              margin: "10px",
              marginTop: "0",
              marginLeft: "0",
            }}
          >
            <div style={gridStyle} className="ag-theme-balham">
              <ListOfItems
                data={items}
                onRowSelect={(row) => {
                  setSelected(row);
                }}
              />
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
