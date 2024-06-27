import React from "react";
import { Box, Typography } from "@mui/material";

export default function HorizontalLineWithMarker({ value, width }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "2px",
        width: `${width + width / 2.5}px`,
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
          width: "40px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="body1">{width}</Typography>
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
