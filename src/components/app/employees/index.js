/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ListOfEmployees from "./listOfEmployees/ListOfEmployees";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VrpanoIcon from "@mui/icons-material/Vrpano";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { DEF_ACTIONS } from "../../../utils/constants/actions";
import {
  deleteEmployeeById,
  getEmployees,
  updateEmployeePassword,
} from "../../../services/employeeService";
import { showToasts } from "../../toast";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";
import ActionButtonGroup from "../../reusableComponents/ButtonGroup/ActionButtonGroup";

export default function EmployeeList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const [openConf, setOpenConf] = useState(false);
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const response = await getEmployees();
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const naviagte = useNavigate();
  const addEmployee = () => {
    naviagte("/employees/add-employee", {
      state: {
        action: DEF_ACTIONS.ADD,
      },
    });
  };

  const editEmployee = () => {
    const employee = data.find((emp) => emp._id === selected[0]);
    naviagte("/employees/edit-employee", {
      state: {
        action: DEF_ACTIONS.EDIT,
        data: employee,
      },
    });
  };

  const viewEmployee = () => {
    const employee = data.find((emp) => emp._id === selected[0]);
    naviagte("/employees/view-employee", {
      state: {
        action: DEF_ACTIONS.VIEW,
        data: employee,
      },
    });
  };

  const deleteEmployee = async () => {
    try {
      const response = await deleteEmployeeById(selected[0]);
      if (response.status === 200) {
        showToasts("SUCCESS", "Employee Deleted Successfully");
        handleConfDialog();
        getAllEmployees();
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Employee Deletion Unsuccessfull");
    }
  };

  const changeEmployeePassword = async () => {
    try {
      const data = {
        _id: selected[0],
        newPassword: password,
      };
      const response = await updateEmployeePassword(data);
      if (response.status === 200) {
        showToasts("SUCCESS", "Password Updated Successfully");
        setPassword("");
        getAllEmployees();
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Password Update Unsuccessfull");
    }
  };

  const handleConfDialog = () => {
    setOpenConf(!openConf);
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
          <ActionButtonGroup
            handleAdd={addEmployee}
            handleEdit={editEmployee}
            handleView={viewEmployee}
            handleDelete={handleConfDialog}
            selectedItemsLength={selected.length}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: 50,
              paddingLeft: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              name="password"
              id="password"
              value={password}
              fullWidth
              disabled={selected.length !== 1}
              onChange={(e) => setPassword(e?.target?.value)}
              type="text"
              sx={{
                "& .MuiInputBase-root": {
                  // borderRadius: "8px",
                  backgroundColor: "#F1F1F1",
                },
                marginTop: "12px",
                width: "200px",
              }}
              size="small"
              variant="outlined"
              label="Password"
            />
            <Button
              variant="contained"
              sx={{
                marginTop: "12px",
                fontSize: "13px",
                marginLeft: "10px",
              }}
              color="success"
              disabled={selected.length !== 1}
              onClick={changeEmployeePassword}
            >
              <ChangeCircleIcon sx={{ marginRight: "5px" }} /> Change
            </Button>
          </Box>
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
      <ConfirmationDialog
        ConfirmAction={deleteEmployee}
        confirmMsg={"Are You Sure You Want To Delete This Employee"}
        open={openConf}
        handleClose={handleConfDialog}
      />
    </Box>
  );
}
