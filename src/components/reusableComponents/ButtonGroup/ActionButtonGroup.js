import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VrpanoIcon from "@mui/icons-material/Vrpano";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";

export default function ActionButtonGroup({
  handleAdd,
  handleEdit,
  handleView,
  handleDelete,
  selectedItemsLength,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: 50,
        marginBottom: "10px",
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
          onClick={handleAdd}
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
          disabled={selectedItemsLength !== 1}
          onClick={handleEdit}
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
          disabled={selectedItemsLength !== 1}
          onClick={handleView}
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
          disabled={selectedItemsLength !== 1}
          onClick={handleDelete}
        >
          <DeleteIcon /> Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
}
