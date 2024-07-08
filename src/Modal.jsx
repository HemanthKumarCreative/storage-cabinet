import React, { useState } from "react";
import { Html } from "@react-three/drei";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Paper,
} from "@mui/material";

function HoverModal({
  open,
  // handleClose,
  position,
  width,
  height,
  heading,
  buttonText,
  type,
  setIsUpperStorageVisible,
  setIsLowerStorageVisible,
  handleModalClose,
  adjustTopDimensions,
  adjustBottomDimensions,
  setCabinetHeight,
}) {
  const [alignment, setAlignment] = useState("60cm");
  const [isHovered, setIsHovered] = useState(false);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setCabinetHeight(newAlignment.split("cm")[0]);
    }
  };

  const handleClose = () => {
    if (type === "storage1") {
      setIsUpperStorageVisible(false);
      adjustTopDimensions();
    } else {
      setIsLowerStorageVisible(false);
      adjustBottomDimensions();
    }
    handleModalClose(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!open && !isHovered) {
    return null;
  }

  const horizontalHoverPosition = {
    50: "50",
    150: "85",
    250: "120",
    350: "140",
    400: "140",
    450: "140",
  };

  const verticalHoverSelection = {
    150: -180,
    180: -180,
    210: -180,
    240: -180,
    270: -180,
    300: -180,
  };

  const verticalHoverPosition =
    type === "storage1" ? -200 : verticalHoverSelection[height];

  return (
    <Html position={position}>
      <Paper
        elevation={3}
        style={{
          padding: "16px",
          backgroundColor: "white",
          transform: `translate(${horizontalHoverPosition[width]}%, ${verticalHoverPosition}%)`, // Adjust this value to move the modal to the top
          zIndex: 1000,
          position: "relative",
          left: "-40%",
          top: "10%", // Adjust this value to position the modal from the top
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-14px",
            transform: "translateY(-50%)",
            width: 0,
            height: 0,
            borderTop: "15px solid transparent",
            borderBottom: "15px solid transparent",
            borderRight: "15px solid white",
          }}
        ></div>
        <Typography
          variant="h6"
          component="h2"
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          {heading}
        </Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="storage height"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <ToggleButton value="60cm" aria-label="60cm">
            60cm
          </ToggleButton>
          <ToggleButton value="50cm" aria-label="50cm">
            50cm
          </ToggleButton>
          <ToggleButton value="40cm" aria-label="40cm">
            40cm
          </ToggleButton>
          <ToggleButton value="30cm" aria-label="30cm">
            30cm
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="text"
          color="error"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
          }}
          onClick={handleClose}
        >
          {buttonText}
        </Button>
      </Paper>
    </Html>
  );
}

export default HoverModal;
