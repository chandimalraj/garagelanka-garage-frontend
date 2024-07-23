/* eslint-disable no-dupe-keys */
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";


function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 22,
      height: 22,
      backgroundColor: "transparent",
      border: `1px solid red`,
      border: "none",
      color: "green",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "transparent",
      color: "green",
    },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  width: "100%",
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#E0E0E0",
    "&:hover": {
      backgroundColor: "#E0E0E0",
    },
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: "rgb(227,226,224)",
      // marginTop: "-8px",
      //marginBottom: "8px",
      zIndex: 20,
      boxShadow: "",
      cursor: "pointer",
    },
    //transition: "all 0.3s ease",
    // border: `1px solid #CCC`,
    borderBottom: `none`,
  },
  " .MuiDataGrid-cell": {
    borderRight: `1px solid #CCC`,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "green",
    color: "white",
    fontSize: "15px",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    // borderTop: `1px solid #CCC`,
    fontSize: "15px",
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none", // Remove focus outline on cells
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .css-axafay-MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },

  ...customCheckbox(theme),
}));

export default function ListOfItems({
  onRowSelect = (_c) => {},
  data = [{ id: "1" }],
  handleDelete,
}) {
  const columns = [
    {
        field: "itemId",
        headerName: "Item ID",
        width: 100,
  
        headerClassName: "super-app-theme--header",
      },
      {
        field: "itemName",
        headerName: "Item Name",
        width: 150,
        flex: 1,
        headerClassName: "super-app-theme--header",
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
        headerClassName: "super-app-theme--header",
      },
      {
        field: "buyingPrice",
        headerName: "Buying Price",
        flex: 1,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "sellingPrice",
        headerName: "Selling Price",
        flex: 1,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "totalQuntity",
        headerName: "Inventory Quantity",
        flex: 1,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "onlineSellingQuntity",
        headerName: "Online Selling Quantity",
        flex: 1,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "availableForOnlineSelling",
        headerName: "Online Selling ",
        flex: 1,
        headerClassName: "super-app-theme--header",
        cellRenderer: (data) => {
          return data.value ? (
            <CheckBox color="success" />
          ) : (
            <CheckBoxOutlineBlankIcon />
          );
        },
      },
    
  ];

  const getRowHeight = () => 40;
  const getRowId = (row) => row._id; // Custom function to generate unique ID

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          height: 400,
          width: "99%",
        }}
      >
        <StyledDataGrid
          //checkboxSelection
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          getRowId={getRowId} // Specify the custom ID function
          disableSelectionOnClick
          onRowSelectionModelChange={onRowSelect}
          getRowHeight={getRowHeight}
        />
      </Box>
    </div>
  );
}
