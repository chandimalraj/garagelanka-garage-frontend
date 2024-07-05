import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 22,
      height: 22,
      backgroundColor: "transparent",
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
    backgroundColor: "white",
    borderRadius: "10px",
    //border: "1px solid ",

    "&:hover": {
      backgroundColor: "white",
    },
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: "rgb(227,226,224)",
      zIndex: 20,
      boxShadow: "",
      cursor: "pointer",
    },
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

export default function ListOfVehicles({
  onRowSelect = (_c) => {},
  data = [{ id: "1" }],
  handleDelete,
}) {
  const columns = [
    {
      field: "make_name",
      headerName: "Make",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "model_name",
      headerName: "Model",
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "registationNumber",
      headerName: "Reg No",
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "year",
      headerName: "Year",
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)} color="warning">
          <HighlightOffIcon />
        </IconButton>
      ),
      headerClassName: "super-app-theme--header",
    },
  ];

  const getRowHeight = () => 40;
  //const getRowId = (row) => row._id; // Custom function to generate unique ID

  return (
    <div style={{ minHeight: 200, marginTop: 15 }}>
      <Box
        sx={{
          height: 300,
          width: "99%",
        }}
      >
        <StyledDataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          //getRowId={getRowId} // Specify the custom ID function
          disableSelectionOnClick
          onRowSelectionModelChange={onRowSelect}
          getRowHeight={getRowHeight}
        />
      </Box>
    </div>
  );
}
