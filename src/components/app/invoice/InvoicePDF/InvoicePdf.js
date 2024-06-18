import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Box, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

//Registering fonts with different weights
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: require("../../../../assets/fonts/Roboto-Medium.ttf"),
      fontWeight: "medium",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    //
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    height: "1000px",
  },
  headingSection: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {},
  invoiceText: { fontSize: "15px" },
  invoiceDateText: { fontSize: "12px" },
  headingInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headingAddress: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  addressText: {
    fontSize: "13px",
  },
  breakLine: {
    height: "1px",
    marginHorizontal: 20,
    backgroundColor: "blue",
  },
  customerInfoSection: {
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
    padding: 10,
  },
  customerInfo: {},
  itemsSection: {
    margin: 10,
    marginTop: 0,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  itemSection: {
    padding: 10,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
  },
  itemName: {
    width: "50%",
    border: "1px solid blue",
    borderRight: "0px",
    padding: 5,
  },
  itemQuantity: {
    width: "10%",
    border: "1px solid blue",
    borderRight: "0px",
    padding: 5,
  },
  itemUnitPrice: {
    width: "20%",
    border: "1px solid blue",
    borderRight: "0px",
    padding: 5,
  },
  itemAmount: {
    width: "20%",
    border: "1px solid blue",
    padding: 5,
  },
  tableHeaderText: {
    fontSize: "12px",
  },
});

const ItemComponent = (item, qty, unitPrice, amount) => (
  <View style={{ ...styles.itemSection, paddingTop: 0 }}>
    <View style={{ ...styles.itemName, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>{item}</Text>
    </View>
    <View style={{ ...styles.itemQuantity, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>{qty}</Text>
    </View>
    <View style={{ ...styles.itemUnitPrice, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>{unitPrice}</Text>
    </View>
    <View style={{ ...styles.itemAmount, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>{amount}</Text>
    </View>
  </View>
);

const ServiceComponent = (serviceType, technician, amount) => (
  <View style={{ ...styles.itemSection, paddingTop: 0 }}>
    <View style={{ ...styles.itemName, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>{serviceType}</Text>
    </View>
    <View style={{ ...styles.itemQuantity, borderTop: 0, width: "30%" }}>
      <Text style={styles.tableHeaderText}>{technician}</Text>
    </View>

    <View style={{ ...styles.itemAmount, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>{amount}</Text>
    </View>
  </View>
);

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headingSection}>
        <View style={styles.heading}>
          <View style={styles.headingInfo}>
            <Text style={styles.headingText}>Skyway Garage</Text>
            <Text style={styles.invoiceText}>Invoice # 000001</Text>
            <Text style={styles.invoiceDateText}>29/06/2024</Text>
          </View>

          <View style={styles.headingAddress}>
            <Text style={styles.addressText}>No 321/A</Text>
            <Text style={styles.addressText}>Colombo Road</Text>
            <Text style={styles.addressText}>Gampaha</Text>
          </View>
        </View>
      </View>
      <View style={styles.breakLine}></View>
      <View style={styles.customerInfoSection}>
        <View style={styles.customerInfo}>
          <View style={styles.headingAddress}>
            <Text style={styles.addressText}>Chandimal Prabath</Text>
            <Text style={styles.addressText}>chandimalprabath@yahoo.com</Text>
            <Text style={styles.addressText}>0763399543</Text>
          </View>
        </View>
      </View>
      <View style={styles.breakLine}></View>
      <View style={styles.itemsSection}>
        <View style={styles.itemSection}>
          <View style={styles.itemName}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Item
            </Text>
          </View>
          <View style={styles.itemQuantity}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Qty
            </Text>
          </View>
          <View style={styles.itemUnitPrice}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Unit Price Rs
            </Text>
          </View>
          <View style={styles.itemAmount}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Amount Rs
            </Text>
          </View>
        </View>
        {ItemComponent("Chain Sproket set", 10, "25,000.00", "250,000.00")}
        {ItemComponent("Chain Sproket set", 10, "25,000.00", "250,000.00")}
        {ItemComponent("Chain Sproket set", 10, "25,000.00", "250,000.00")}
      </View>
      <View style={styles.breakLine}></View>
      <View style={styles.itemsSection}>
        <View style={styles.itemSection}>
          <View style={styles.itemName}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Service Type
            </Text>
          </View>
          <View style={{ ...styles.itemQuantity, width: "30%" }}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Technician
            </Text>
          </View>
          <View style={styles.itemAmount}>
            <Text
              style={{
                ...styles.tableHeaderText,
                fontFamily: "Roboto",
                fontWeight: "medium",
              }}
            >
              Amount Rs
            </Text>
          </View>
        </View>
        {ServiceComponent("Chain Sproket set", "Nimal Perera", "25,000.00")}
        {ServiceComponent("Chain Sproket set", "Nimal Perera", "25,000.00")}
        {ServiceComponent("Chain Sproket set", "Nimal Perera", "25,000.00")}
      </View>
    </Page>
  </Document>
);

export default function InvoicePdf() {
  const location = useLocation()
  console.log(location.state.data)
  const [items, setItems] = useState(location.state.data.itemList);
  const [service, setServices] = useState(location.state.data.serviceList);

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
          height: "auto",
        }}
      >
        <PDFViewer style={{ width: "100%", height: "1000px" }}>
          {MyDocument()}
        </PDFViewer>
      </Paper>
    </Box>
  );
}
