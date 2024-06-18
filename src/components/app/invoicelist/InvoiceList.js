import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Button } from "@mui/material";
import ListOfInvoice from "./ListOfInvoice/ListOfInvoice";
import { getInvoices } from "../../../services/invoiceService";
import { useNavigate } from "react-router-dom";

export default function InvoiceList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState([]);
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

  const printInvoice = () => {
  
    const selectedInvoice = data.find((item)=>item._id === selected[0])
    console.log(selectedInvoice)

    navigate("/invoice/invoice-pdf", { state: { data: selectedInvoice } });
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
          <Button
            variant="contained"
            sx={{
              marginTop: "12px",
              fontSize: "13px",
            }}
            color="success"
            disabled={selected.length !== 1}
            onClick={printInvoice}
          >
            View
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
                console.log(row)
                setSelected(row);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
