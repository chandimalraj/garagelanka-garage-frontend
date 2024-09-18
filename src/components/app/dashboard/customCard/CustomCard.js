import { IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import styled from "styled-components";

export default function CustomCard({icon,background,header,subHeader}) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "220px",
        background:background
      }}
    >
      <IconButton
        sx={{
          minWidth: 10,
          justifyContent: "center",
          color: "#e5e4e2",
          backgroundColor: "#2b2a2a",
          "&:hover": {
            backgroundColor: "black", // Change this value to your desired hover background color
          },
        }}
      >
        {icon}
      </IconButton>
      <Header> {header}</Header>
      <SubHeader>{subHeader}</SubHeader>
    </Paper>
  );
}

export const Header = styled(Typography)`
  && {
    font-size: 22px;
    margin-top: 10px;
    font-weight: 700;
  }
`;

export const SubHeader = styled(Typography)`
  && {
    font-size: 15px;
    margin: 10px 0;
    font-weight: 500;
  }
`;
