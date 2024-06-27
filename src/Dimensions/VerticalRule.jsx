import React from "react";
import { Box, Typography } from "@mui/material";

export default function VerticalLineWithMarker({ value, height }) {
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
          width: "40px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="body1">{height}</Typography>
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
