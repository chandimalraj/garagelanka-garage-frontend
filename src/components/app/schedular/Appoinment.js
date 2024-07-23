import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";

export default function Appoinment({ data, proceed, deleteAppoinment }) {
  const utcDateString = "2023-12-13T10:00:00.000Z";
  const utcDate = new Date(utcDateString);

  // Get the local date and time string
  const localDateString = utcDate.toLocaleString();
  return (
    <AppoinmentitemWrapper color={data.colorCode}>
      <Grid container>
        <Grid item lg={4}>
          <Box
            sx={{
              backgroundColor: `${data.colorCode}`,
              display: "flex",
              justifyContent: "center",
              width: "220px",
              paddingY: "2px",
              borderRadius:"4px"
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {data.serviceType}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                // fontWeight: "500",
              }}
            >
              {" "}
              From :{" "}
            </Typography>{" "}
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {" "}
              {new Date(data.startDate).toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                // fontWeight: "500",
              }}
            >
              To :
            </Typography>{" "}
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {new Date(data.endDate).toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Typography sx={{ fontSize: "13px" }}>
            {data.userFirstName} {data.userLastName}
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <Typography sx={{ fontSize: "13px" }}>{data.mobile}</Typography>
        </Grid>
        <Grid item lg={4}></Grid>
        <Grid item lg={4}>
          <Typography sx={{ fontSize: "13px" }}>
            {data.vehicleModelName}
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <Typography sx={{ fontSize: "13px" }}>{data.vehicleRegNo}</Typography>
        </Grid>
        <Grid item lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              width: "100px",

              // marginLeft: "40px",
              fontSize: "10px",
            }}
            color="success"
            onClick={() => {
              proceed();
            }}
          >
            Proceed
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              marginLeft: "20px",
              fontSize: "10px",
              marginRight: "10px",
              backgroundColor: "#e63946",
            }}
            color="warning"
            onClick={() => {
              deleteAppoinment(data);
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </AppoinmentitemWrapper>
  );
}

const AppoinmentitemWrapper = styled.div`
  border: 1px solid ${(props) => props.color};
  background-color: #f1efef;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  /* margin-left: 40px; */
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(224, 224, 224, 0.9);
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;
const ActionButton = styled.button`
  width: 100px;
  padding: 5px;
  margin: 10px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
  border-radius: 3px;
`;
