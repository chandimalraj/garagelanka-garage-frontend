import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Button, ButtonGroup } from "@mui/material";

import { getInvoices } from "../../../services/invoiceService";
import { useLocation, useNavigate } from "react-router-dom";
import ListOfEmployees from "./listOfEmployees/ListOfEmployees";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VrpanoIcon from "@mui/icons-material/Vrpano";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEF_ACTIONS } from "../../../utils/constants/actions";

export default function EmployeeList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllInvoices();
  }, []);

  const getAllInvoices = async () => {
    try {
      const response = await getInvoices(page, limit);
      console.log(response);
      setData(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const naviagte = useNavigate();
  const addEmployee = () => {
    naviagte("/employees/add-employee", {
      state: {
        name: location?.state?.name,
        category: location?.state?.category,
        action: DEF_ACTIONS.ADD,
      },
    });
  };

  const editEmployee = () => {
    const item = data.find((item) => item.id == selected[0]);
    naviagte("/employees/add-employee", {
      state: {
        name: location?.state?.name,
        //category: location?.state?.category,
        action: DEF_ACTIONS.EDIT,
        item: item,
      },
    });
  };

  const viewEmployee = () => {
    const item = data.find((item) => item.id == selected[0]);
    naviagte("/inventory/item-view", {
      state: {
        name: location?.state?.name,
        //category: location?.state?.category,
        action: DEF_ACTIONS.VIEW,
        item: item,
      },
    });
  };

  return (
    <Box
      sx={{
        paddingX: 5,
        paddingTop: 10,
        width: "100%",
        fontFamily: "Poppins",
        overflowY: "scroll",
      }}
    >
      <Paper
        elevation={2}
        style={{
          borderRadius: 5,
          padding: 5,
          marginBottom: "20px",
          height: "1500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: 50,
            paddingLeft: "10px",
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
             onClick={addEmployee}
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
              disabled
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
              disabled
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
              disabled
            >
              <DeleteIcon /> Delete
            </Button>
          </ButtonGroup>
        </Box>
        <Grid container>
          <Grid
            item
            lg={12}
            sx={{
              paddingTop: "15px",
              paddingLeft: "10px",
            }}
          >
            <ListOfEmployees
              data={data}
              onRowSelect={(row) => {
                console.log(row);
                setSelected(row);
                //printInvoice(row);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
