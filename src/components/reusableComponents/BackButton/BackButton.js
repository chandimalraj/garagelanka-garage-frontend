import { Button } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { styled } from "@mui/system";

export default function BackButton({ goBack }) {
  return (
    <CustomButton variant="contained" onClick={goBack}>
      <KeyboardDoubleArrowLeftIcon />
      BACK
    </CustomButton>
  );
}

const CustomButton = styled(Button)(() => ({
  width: "80px",
  backgroundColor: "#bb86fc", // Initial background color
  color: "#fff", // Text color
  "&:hover": {
    backgroundColor: "#9b59b6", // Change background on hover
  },
}));
