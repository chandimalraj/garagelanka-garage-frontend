import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/material/styles";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 22,
      height: 22,
      backgroundColor: "transparent",
    //   border: `1px solid red`,
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
  border: '',
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
    border: "1px solid " + "theme.coreColors.primary",

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
    borderLeft: `1px solid #CCC`,
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

export default function ListOfCustomers({
  onRowSelect = (_c) => {},
  data = [{ id: "1" }],
  handleDelete,
}) {
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleDateString();
  };

  const columns = [
    {
      field: "coustomerName",
      headerName: "Customer Name",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "coustomerMobile",
      headerName: "Mobile",
      width: 180,
      flex:1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: 'vehicles',
    //   headerName: 'vehilces',
    //   width: 300,
    //   flex:1,
    //   renderCell: (params) => (
    //     <Box>
    //       {params.row.vehicles.map((vehicle, index) => (
    //         <Accordion key={index}>
    //         <AccordionSummary
    //           expandIcon={<ExpandMoreIcon />}
    //           aria-controls={`panel${index}-content`}
    //           id={`panel${index}-header`}
    //         >
    //           <Typography variant="subtitle2">{vehicle.make_name}</Typography>
    //         </AccordionSummary>
    //         {/* <AccordionDetails>
    //           <Typography variant="body2">{vehicle.registationNumber}</Typography>
    //         </AccordionDetails> */}
    //       </Accordion>
    //       ))}
    //     </Box>
    //   ),
    // },
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
