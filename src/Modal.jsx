import React, { useState } from "react";
import { Html } from "@react-three/drei";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Paper,
} from "@mui/material";

/**
 * HoverModal Component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Determines if the modal should be open
 * @param {Array} props.position - The 3D position of the modal in the scene
 * @param {number} props.width - The width of the cabinet
 * @param {number} props.height - The height of the cabinet
 * @param {string} props.heading - The heading text displayed at the top of the modal
 * @param {string} props.buttonText - The text for the button displayed at the bottom of the modal
 * @param {string} props.type - The type of cabinet, either "storage1" or another type
 * @param {function} props.setIsUpperStorageVisible - Function to set the visibility of the upper storage
 * @param {function} props.setIsLowerStorageVisible - Function to set the visibility of the lower storage
 * @param {function} props.handleModalClose - Function to handle closing the modal
 * @param {function} props.adjustTopDimensions - Function to adjust the top dimensions of the cabinet
 * @param {function} props.adjustBottomDimensions - Function to adjust the bottom dimensions of the cabinet
 * @param {function} props.setCabinetHeight - Function to set the height of the cabinet
 *
 * @returns {JSX.Element} HoverModal component
 */
function HoverModal({
  open,
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

  /**
   * Handle alignment change for cabinet height
   *
   * @param {Object} event - The event object
   * @param {string} newAlignment - The new alignment value
   */
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setCabinetHeight(newAlignment.split("cm")[0]);
    }
  };

  /**
   * Handle closing the modal
   */
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

  /**
   * Handle mouse enter event
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * Handle mouse leave event
   */
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
          transform: `translate(${horizontalHoverPosition[width]}%, ${verticalHoverPosition}%)`,
          zIndex: 1000,
          position: "relative",
          left: "-40%",
          top: "10%",
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
          <ToggleButton value="60cm" aria-label="60cm" color="warning">
            60cm
          </ToggleButton>
          <ToggleButton value="50cm" aria-label="50cm" color="warning">
            50cm
          </ToggleButton>
          <ToggleButton value="40cm" aria-label="40cm" color="warning">
            40cm
          </ToggleButton>
          <ToggleButton value="30cm" aria-label="30cm" color="warning">
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
