import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SearchItem({ name, id, btn, price, setOrder, status  }) {
  //const [color, setColor] = useState("");
  // useEffect(() => {
  //   if (status == "Pending") {
  //     setColor("#fb5607");
  //   }
  //   if (status == "Accepted") {
  //     setColor("#fb5607");
  //   }
  // }, status);
  let color = ""
  if(status == "Pending"){
    color = "#fb8500"
  }
  if(status == "Accepted"){
    color = "#65B741"
  }

  return (
    <SearchItemWrapper onClick={setOrder} color={color}>
      <ItemDetails>
        <Typography sx={{ fontFamily: "Poppins", fontWeight: "600",fontSize: "14px" }}>
          {id}
        </Typography>
        <Typography
          sx={{ fontFamily: "Roboto", fontWeight: "400", fontSize: "14px" }}
        >
          {name}
        </Typography>
      </ItemDetails>
      <ActionButton color={color}>{status}</ActionButton>
      <Typography sx={{ fontFamily: "Poppins", fontWeight: "600" ,fontSize: "14px"}}>
        Rs {price}
      </Typography>
    </SearchItemWrapper>
  );
}

const SearchItemWrapper = styled.div`
  background-color: #f1efef;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 8px;
  border: 1px solid ${(props) => props.color};
  cursor: pointer;
  &:hover {
    background-color: rgba(224, 224, 224, 0.9);
  };
  border-radius: 5px;
`;
const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;
const ActionButton = styled.button`
  width: 100px;
  padding: 5px;
  margin: 10px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
  border-radius: 3px;
  font-size:14px;
`;
