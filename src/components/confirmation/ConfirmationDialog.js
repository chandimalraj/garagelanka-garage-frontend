import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

export default function ConfirmationDialog({
  confirmMsg,
  open,
  handleClose,
  ConfirmAction,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description"
    >
      <DialogTitle id="delete-object" sx={{ fontSize: "18px" }}>
        {"Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-description" sx={{ fontSize: "15px" }}>
          {confirmMsg}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          variant="contained"
          color="success"
        >
          No
        </Button>
        <Button
          onClick={ConfirmAction}
          variant="contained"
          sx={{
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "#d62828", // Change this value to your desired hover background color
            },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
