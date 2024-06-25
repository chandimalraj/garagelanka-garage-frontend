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
    {
      src: require("../../../../assets/fonts/Roboto-BoldItalic.ttf"),
      fontWeight: "thin",
      fontStyle: "italic",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    //height: "1000px",
    position: "relative",
  },
  headingBorder: {
    height: "20px",
    backgroundColor: "blue",
  },
  headingSection: {
    padding: 20,
    marginBottom: 0,
    // padding: 10,
    backgroundColor: "#E0E0E0",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    fontFamily: "Roboto",
    fontWeight: "medium",
  },
  invoiceText: { fontFamily: "Roboto", fontWeight: "medium", fontSize: "15px" },
  invoiceDateText: {
    fontFamily: "Roboto",
    fontWeight: "medium",
    fontSize: "12px",
  },
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
    fontFamily: "Roboto",
    fontWeight: "medium",
    color: "#616161",
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
    border: "1px solid #E0E0E0",
    borderRight: "0px",
    padding: 5,
  },
  itemQuantity: {
    width: "10%",
    border: "1px solid #E0E0E0",
    borderRight: "0px",
    padding: 5,
  },
  itemUnitPrice: {
    width: "20%",
    border: "1px solid #E0E0E0",
    borderRight: "0px",
    padding: 5,
  },
  itemAmount: {
    width: "20%",
    border: "1px solid #E0E0E0",
    padding: 5,
  },
  tableHeaderText: {
    fontSize: "12px",
    color: "#757575",
  },
  amountView: {
    paddingRight: 20,
    height: "40px",
    backgroundColor: "#F9F9FB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: "50",
    left: "0",
    right: "0",
  },
  footer: {
    height: "30px",
    backgroundColor: "#F9F9FB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "20",
    left: "0",
    right: "0",
  },
  footerText: {
    fontSize: "11px",
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "medium",
    color: "#616161",
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
      <Text style={styles.tableHeaderText}>
        {parseFloat(unitPrice).toFixed(2)}
      </Text>
    </View>
    <View style={{ ...styles.itemAmount, borderTop: 0 }}>
      <Text style={styles.tableHeaderText}>
        {parseFloat(amount).toFixed(2)}
      </Text>
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
      <Text style={styles.tableHeaderText}>
        {parseFloat(amount).toFixed(2)}
      </Text>
    </View>
  </View>
);

// Create Document Component
const MyDocument = (data) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headingBorder}></View>
      <View style={styles.headingSection}>
        <View style={styles.heading}>
          <View style={styles.headingInfo}>
            <Text style={styles.headingText}>{data.serviceCenter?.name}</Text>
            <Text style={styles.invoiceText}>Invoice # {data.invoiceNo}</Text>
            <Text style={styles.invoiceDateText}>{`${new Date(
              data.billingDate
            ).getFullYear()}-${
              new Date(data.billingDate).getMonth() + 1
            }-${new Date(data.billingDate).getDate()}`}</Text>
          </View>

          <View style={styles.headingAddress}>
            <Text style={styles.addressText}>No 321/A</Text>
            <Text style={styles.addressText}>Colombo Road</Text>
            <Text style={styles.addressText}>Gampaha</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.breakLine}></View> */}
      <View style={styles.customerInfoSection}>
        <View style={styles.customerInfo}>
          <View style={styles.headingAddress}>
            <Text style={styles.addressText}>{data?.customer?.name}</Text>
            <Text style={styles.addressText}>{data?.customer?.email}</Text>
            <Text
              style={{
                ...styles.addressText,
                fontSize: "11px",
                marginTop: "3px",
              }}
            >
              {data?.customer?.mobile}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.breakLine}></View> */}
      {data?.itemList.length > 0 && (
        <View style={styles.itemsSection}>
          <View style={styles.itemSection}>
            <View style={styles.itemName}>
              <Text
                style={{
                  ...styles.tableHeaderText,
                  fontFamily: "Roboto",
                  fontWeight: "medium",
                  color: "#616161",
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
                  color: "#616161",
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
                  color: "#616161",
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
                  color: "#616161",
                }}
              >
                Amount Rs
              </Text>
            </View>
          </View>
          {data?.itemList.map((item) =>
            ItemComponent(
              item?.itemName,
              item?.qnt,
              item?.unitPrice,
              item?.total
            )
          )}
        </View>
      )}
      {/* <View style={styles.breakLine}></View> */}
      {data?.serviceList.length > 0 && (
        <View style={styles.itemsSection}>
          <View style={styles.itemSection}>
            <View style={styles.itemName}>
              <Text
                style={{
                  ...styles.tableHeaderText,
                  fontFamily: "Roboto",
                  fontWeight: "medium",
                  color: "#616161",
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
                  color: "#616161",
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
                  color: "#616161",
                }}
              >
                Amount Rs
              </Text>
            </View>
          </View>
          {data?.serviceList.map((service) =>
            ServiceComponent(
              service.serviceTypeName,
              service?.technician,
              service?.total
            )
          )}

        </View>
      )}
      <View style={styles.amountView}>
        <View
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "medium",
              fontSize: "14px",
              color: "#616161",
            }}
          >
            Total Amount
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: "medium",
              fontSize: "14px",
              color: "#616161",
            }}
          >
            Rs {parseFloat(data?.finalAmount).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered By </Text>
        <Text
          style={{
            ...styles.footerText,
            fontWeight: "bold",
            fontSize: "10px",
            fontStyle: "italic",
            color: "red",
          }}
        >
          GarageLanka.lk
        </Text>
      </View>
      <View
        style={{
          ...styles.headingBorder,
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      ></View>
    </Page>
  </Document>
);

export default function InvoicePdf() {
  const location = useLocation();
  console.log(location.state.data);

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
        <PDFViewer style={{ width: "100%", height: "660px" }}>
          {MyDocument(location.state.data)}
        </PDFViewer>
      </Paper>
    </Box>
  );
}
