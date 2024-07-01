import React from "react";
import { Box, Typography } from "@mui/material";

export default function HorizontalLineWithMarker({ value, width, isCM }) {
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
        height: "2px",
        width: `${width + width / 1.3}px`,
        backgroundColor: "grey",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: `calc(${value}% - 10px)`,
          transform: "translateY(-50%)",
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
            ? width
            : `${cmToFeetInches(width).feet.toFixed(0)}' ${cmToFeetInches(
                width
              ).inches.toFixed(0)}''`}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          backgroundColor: "black",
          width: "2px",
          height: "10px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          backgroundColor: "black",
          width: "2px",
          height: "10px",
        }}
      />
    </Box>
  );
}
