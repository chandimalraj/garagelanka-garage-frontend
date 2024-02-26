import React from "react";
import styled from "@emotion/styled";

export default function TimeSlot({ item, selectTimeSlot, selected }) {
  const getLocalTime = (dateString) => {
    const date = new Date(dateString);
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return timeString;
  };

  console.log(selected)

  return (
    <TimeSlotContainer
      onClick={() => {
        selectTimeSlot(item);
       
      }}
      color={selected == item? "#40a845" : "#dce7db"}
      hcolor = {selected == item? "#40a845" : "rgba(224, 224, 224, 0.9)"}
    >
      <SlotContainer>
        <SlotTitle>From &nbsp;&nbsp;:</SlotTitle>
        <SlotTime>&nbsp;{getLocalTime(item.from)}</SlotTime>
      </SlotContainer>
      <SlotContainer>
        <SlotTitle>To &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</SlotTitle>
        <SlotTime>&nbsp;{getLocalTime(item.to)}</SlotTime>
      </SlotContainer>
    </TimeSlotContainer>
  );
}

const TimeSlotContainer = styled.div`
  width: 170px;
  height: 50px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.color};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color:${(props) => props.hcolor};
  }
`;

const SlotContainer = styled.div`
  //height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SlotTitle = styled.span`
  font-family: "Roboto";
  font-weight: 500;
`;

const SlotTime = styled.span`
  font-weight: 400;
`;
