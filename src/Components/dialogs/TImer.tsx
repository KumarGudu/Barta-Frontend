import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Timer = ({ timeInSecond }: { timeInSecond: number }) => {
  const [time, setTime] = useState(timeInSecond); // 2 minutes in seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Timer: {formatTime(time)}</Typography>
    </Box>
  );
};

export default Timer;
