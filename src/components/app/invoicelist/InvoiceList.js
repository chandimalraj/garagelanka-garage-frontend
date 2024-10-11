import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Button, TextField } from "@mui/material";
import ListOfInvoice from "./ListOfInvoice/ListOfInvoice";
import {
  getInvoiceByDateRange,
  getInvoiceByInvoiceNum,
  getInvoices,
} from "../../../services/invoiceService";
import { useNavigate } from "react-router-dom";
import { showToasts } from "../../toast";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FieldWrapper } from "../employees/employeeForm/EmployeeForm";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function InvoiceList() {
  const getOneWeekBefore = () => {
    const today = new Date(); // Current date
    const oneWeekBefore = new Date(today); // Create a copy of today's date
    oneWeekBefore.setDate(today.getDate() - 7); // Subtract 7 days
    return oneWeekBefore; // Return the date one Week before today
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const [invoiceNum, setInvoiceNum] = useState("");
  const [dateRange, setDateRange] = useState({
    from: getOneWeekBefore(),
    to: new Date(),
  });

  const navigate = useNavigate();

  const getAllInvoices = async () => {
    try {
      const response = await getInvoices(page, limit);
      console.log(response);
      setData(response.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const getInvoice = async () => {
    try {
      const response = await getInvoiceByInvoiceNum(invoiceNum);
      if (
        response.status === 200 &&
        response.data?.data?.serviceBills?.length > 0
      ) {
        showToasts("SUCCESS", "Invoice Fetched Successfully!");
        console.log(response);
        setData(response.data?.data?.serviceBills);
      } else {
        showToasts("ERROR", "Invoice Fetched Unsuccess!");
      }
    } catch (error) {
      console.log(error);
      showToasts("ERROR", "Invoice Fetched Unsuccess!");
    }
  };

  const printInvoice = (row) => {
    const selectedInvoice = data.find((item) => item._id === row[0]);
    console.log(selectedInvoice);
    navigate("/invoice/invoice-pdf", { state: { data: selectedInvoice } });
  };

  const handleChange = (value) => {
    setInvoiceNum(value);
  };

  const handleChangeDate = (value, target) => {
    setDateRange((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const getInvoiceByDate = async () => {
    try {
      const response = await getInvoiceByDateRange(
        dateRange?.from,
        dateRange?.to
      );
      console.log(response);
      setData(response?.data?.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    handleChangeDate(new Date(), "to");
    handleChangeDate(getOneWeekBefore(), "from");
    handleChange("");
    getInvoiceByDate();
  };

  useEffect(() => {
    getInvoiceByDate();
  }, [dateRange?.from, dateRange?.to]);

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
          <TextField
            name="invoiceNum"
            id="invoiceNum"
            value={invoiceNum}
            fullWidth
            onChange={(e) => handleChange(e?.target?.value)}
            type="text"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#F1F1F1",
              },
              marginTop: "12px",
              width: "200px",
              marginRight: "10px",
            }}
            size="small"
            variant="outlined"
            label="Invoice Number"
          />

          <Button
            variant="contained"
            sx={{
              marginTop: "12px",
              fontSize: "13px",
            }}
            color="success"
            onClick={getInvoice}
          >
            <SearchIcon />
            Search
          </Button>

          <FieldWrapper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From"
                value={dayjs(dateRange?.from)}
                onChange={(e) => {
                  console.log(dayjs(e));
                  handleChangeDate(dayjs(e).format("YYYY-MM-DD"), "from");
                }}
                sx={{
                  width: "200px",
                  marginTop: "9px",
                  ".MuiInputBase-root": {},
                  ".MuiInputBase-input": {
                    height: "inherit", // Apply height to input
                    padding: "10px", // Adjust padding to fit the height
                  },
                }}
                defaultValue={dayjs(new Date())}
              />
            </LocalizationProvider>
          </FieldWrapper>

          <FieldWrapper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To"
                value={dayjs(dateRange?.to)}
                onChange={(e) => {
                  console.log(dayjs(e));
                  handleChangeDate(dayjs(e).format("YYYY-MM-DD"), "to");
                }}
                sx={{
                  width: "200px",
                  marginTop: "9px",
                  ".MuiInputBase-root": {},
                  ".MuiInputBase-input": {
                    height: "inherit", // Apply height to input
                    padding: "10px", // Adjust padding to fit the height
                  },
                }}
                defaultValue={dayjs(new Date())}
              />
            </LocalizationProvider>
          </FieldWrapper>

          <Button
            variant="contained"
            sx={{
              marginTop: "12px",
              fontSize: "13px",
              marginLeft: "10px",
            }}
            color="success"
            disabled={
              invoiceNum === "" &&
              dateRange?.from === getOneWeekBefore() &&
              dateRange?.to === new Date()
            }
            onClick={resetFunction}
          >
            <RestartAltIcon />
            Reset
          </Button>
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
            <ListOfInvoice
              data={data}
              onRowSelect={(row) => {
                console.log(row);
                setSelected(row);
                printInvoice(row);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
