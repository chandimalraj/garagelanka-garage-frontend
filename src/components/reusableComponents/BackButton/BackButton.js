import { Button } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { styled } from '@mui/system';

export default function BackButton({ goBack }) {
  return (
    <CustomButton color="success" variant="contained" onClick={goBack}>
      <KeyboardDoubleArrowLeftIcon />
      BACK
    </CustomButton>
  );
}

const CustomButton = styled(Button)(() => ({
  width: "80px",
}));
