import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTime } from "react-timer-hook";

function MyTime() {
  const { seconds, minutes, hours } = useTime({ format: "12-hour" });

  // State to store the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the date whenever the time changes (every second)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [seconds]); // Rerun effect whenever seconds chang

  // Helper function to ensure two digits for hours, minutes, and seconds
  const formatTwoDigits = (number) => (number < 10 ? `0${number}` : number);

  // Format the date as MM/DD/YYYY
  const formattedDate = `${formatTwoDigits(
    currentDate.getMonth() + 1
  )}/${formatTwoDigits(currentDate.getDate())}/${currentDate.getFullYear()}`;

  // Get AM/PM based on the hours value
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Handle 12 AM/PM properly

  return (
    <Paper
      sx={{
        padding: "5px",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.1) 0.1%, rgba(108,108,108,1) 90%)",
      }}
    >
      <div style={{ fontSize: "20px", display: "flex", fontWeight: "400",color:'white' }}>
        <div style={{ marginRight: "10px" }}>{formattedDate}</div>
        <div style={{ width: "90px" }}>
          <span>{formatTwoDigits(formattedHours)}</span>:
          <span>{formatTwoDigits(minutes)}</span>:
          <span>{formatTwoDigits(seconds)}</span>
        </div>

        <span> {ampm}</span>
      </div>
    </Paper>
  );
}

export default function TimeCard() {
  return (
    <div>
      <MyTime />
    </div>
  );
}
