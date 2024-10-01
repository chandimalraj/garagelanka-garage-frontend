import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Button, TextField } from "@mui/material";
import ListOfInvoice from "./ListOfInvoice/ListOfInvoice";
import {
  getInvoiceByInvoiceNum,
  getInvoices,
} from "../../../services/invoiceService";
import { useNavigate } from "react-router-dom";
import { showToasts } from "../../toast";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function InvoiceList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
  const [invoiceNum, setInvoiceNum] = useState("");
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
          <Button
            variant="contained"
            sx={{
              marginTop: "12px",
              fontSize: "13px",
              marginLeft: "10px",
            }}
            color="success"
            disabled={invoiceNum === ""}
            onClick={() => {
              handleChange("");
              getAllInvoices();
            }}
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
