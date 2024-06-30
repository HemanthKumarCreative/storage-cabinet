import React from "react";
import { Box, Typography } from "@mui/material";

export default function VerticalLineWithMarker({ value, height, isCM }) {
  function cmToFeetInches(cm) {
    // 1 inch = 2.54 cm
    // 1 foot = 12 inches
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;

    return { feet: feet, inches: remainingInches };
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: `${height + height / 20}px`,
        width: "2px",
        backgroundColor: "grey",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: `calc(${value}% - 10px)`,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          borderRadius: "50%",
          width: "fit-content",
          minWidth: "50px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="body1">
          {isCM
            ? height
            : `${cmToFeetInches(height).feet.toFixed(0)}' ${cmToFeetInches(
                height
              ).inches.toFixed(0)}''`}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "black",
          width: "10px",
          height: "2px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "black",
          width: "10px",
          height: "2px",
        }}
      />
    </Box>
  );
}
