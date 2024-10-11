import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VrpanoIcon from "@mui/icons-material/Vrpano";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, ButtonGroup } from "@mui/material";

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
            backgroundColor: "#07bc0c",
            "&:hover": {
              backgroundColor: "#05a00b", // Change the color on hover
            },
          }}
          onClick={handleAdd}
        >
          <AddIcon /> Add
        </Button>
        <Button
          variant="contained"
          sx={{
            marginTop: "12px",
            fontSize: "13px",
            backgroundColor: "#3498DB",
            "&:hover": {
              backgroundColor: "#2980B9", // Change the color on hover
            },
          }}
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
            backgroundColor: "#f1c40f",
            "&:hover": {
              backgroundColor: "#D4AC0D", // A bit darker than #f1c40f
            },
          }}
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
            backgroundColor: "#e74c3c",
            "&:hover": {
              backgroundColor: "#C0392B", // A bit darker than #e74c3c
            },
          }}
          disabled={selectedItemsLength !== 1}
          onClick={handleDelete}
        >
          <DeleteIcon /> Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
}
