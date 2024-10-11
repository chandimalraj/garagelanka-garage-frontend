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
import ListOfExpenses from "./listOfExpenses/ListOfExpenses";
import {
  deleteExpenseById,
  getExpenses,
} from "../../../services/expensesService";
import ActionButtonGroup from "../../reusableComponents/ButtonGroup/ActionButtonGroup";

export default function ExpensesList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const [openConf, setOpenConf] = useState(false);
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllExpenses();
  }, []);

  const getAllExpenses = async () => {
    try {
      const response = await getExpenses();
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const naviagte = useNavigate();
  const addExpense = () => {
    naviagte("/expenses/add-expense", {
      state: {
        action: DEF_ACTIONS.ADD,
      },
    });
  };

  const editExpense = () => {
    const employee = data.find((exp) => exp._id === selected[0]);
    naviagte("/expenses/edit-expense", {
      state: {
        action: DEF_ACTIONS.EDIT,
        data: employee,
      },
    });
  };

  const viewExpense = () => {
    const expense = data.find((exp) => exp._id === selected[0]);
    naviagte("/expenses/view-expense", {
      state: {
        action: DEF_ACTIONS.VIEW,
        data: expense,
      },
    });
  };

  const deleteExpense = async () => {
    try {
      const response = await deleteExpenseById(selected[0]);
      if (response.status === 200) {
        showToasts("SUCCESS", "Expense Deleted Successfully");
        handleConfDialog();
        getAllExpenses();
      }
    } catch (error) {
      console.log(error);
      handleConfDialog();
      showToasts("ERROR", "Expense Deletion Unsuccessfull");
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
            handleAdd={addExpense}
            handleEdit={editExpense}
            handleView={viewExpense}
            handleDelete={deleteExpense}
            selectedItemsLength={selected.length}
          />
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
            <ListOfExpenses
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
        ConfirmAction={deleteExpense}
        confirmMsg={"Are You Sure You Want To Delete This Expense"}
        open={openConf}
        handleClose={handleConfDialog}
      />
    </Box>
  );
}
