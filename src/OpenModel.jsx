import React, { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import {
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";

function HoverModal({
  open,
  handleClose,
  position,
  width,
  height,
  heading,
  buttonText,
  type,
  setConfiguration,
  configuration,
  setCabinetHeight,
}) {
  const [rowHeight, setRowHeight] = useState("30cm");
  const [doors, setDoors] = useState(type === "small" ? "Max" : "None");
  const [drawers, setDrawers] = useState(type === "drawer" ? "Max" : "None");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (
      configuration?.openRow1 &&
      configuration?.openRow2 &&
      configuration?.openRow3 &&
      configuration?.openRow4 &&
      configuration?.openRow5 &&
      configuration?.openRow6
    ) {
      switch (type) {
        case "small":
          setConfiguration((oldConfig) => ({
            ...oldConfig,
            openRow1: { doors, drawers },
          }));
          break;
        case "open1":
          setConfiguration((oldConfig) => ({
            ...oldConfig,
            openRow2: { doors, drawers },
          }));
          break;
        case "open2":
          setConfiguration((oldConfig) => ({
            ...oldConfig,
            openRow3: { doors, drawers },
          }));
          break;
        case "open3":
          setConfiguration((oldConfig) => ({
            ...oldConfig,
            openRow4: { doors, drawers },
          }));
          break;
        case "open4":
          setConfiguration((oldConfig) => ({
            ...oldConfig,
            openRow5: { doors, drawers },
          }));
          break;
        case "drawer":
          setConfiguration((oldConfig) => ({
            ...oldConfig,
            openRow6: { doors, drawers },
          }));
          break;
      }
    }
  }, [doors, drawers]);

  const handleRowHeight = (event, newHeight) => {
    if (newHeight !== null) {
      setRowHeight(newHeight);
      setCabinetHeight(newHeight.split("cm")[0]);
    }
  };

  const handleDoors = (event, newDoors) => {
    if (newDoors !== null) {
      if (newDoors === "Max") {
        setDrawers("None");
      } else if (newDoors === "Some") {
        setDrawers("Some");
      } else if (newDoors === "None") {
        // setDrawers("Max");
      }
      setDoors(newDoors);
    }
  };

  const handleDrawers = (event, newDrawers) => {
    if (newDrawers !== null) {
      if (newDrawers === "Max") {
        setDoors("None");
      } else if (newDrawers === "Some") {
        setDoors("Some");
      } else if (newDrawers === "None") {
        // setDoors("Max");
      }
      setDrawers(newDrawers);
    }
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
    50: "60",
    150: "95",
    250: "130",
    350: "150",
    400: "150",
    450: "200",
  };

  const verticalHoverSelection = {
    open1: { 150: -120, 180: -100, 210: -80, 240: -60, 270: -100, 300: -80 },
    open2: { 150: -120, 180: -100, 210: -80, 240: -100, 270: -80, 300: -60 },
    open3: { 150: -120, 180: -100, 210: -100, 240: -80, 270: -60, 300: -40 },
    open4: { 150: -120, 180: -100, 210: -80, 240: -60, 270: -40, 300: -20 },
    drawer: { 150: -100, 180: -70, 210: -60, 240: -40, 270: -20, 300: 0 },
    small: { 150: -120, 180: -100, 210: -80, 240: -60, 270: -100, 300: -100 },
  };

  const verticalHoverPosition = verticalHoverSelection[type][height];

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
          variant="subtitle1"
          component="p"
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Row Height
        </Typography>
        <ToggleButtonGroup
          value={rowHeight}
          exclusive
          onChange={handleRowHeight}
          aria-label="row height"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <ToggleButton value="30cm" aria-label="30cm" color="warning">
            30cm
          </ToggleButton>
          <ToggleButton value="40cm" aria-label="40cm" color="warning">
            40cm
          </ToggleButton>
          <ToggleButton value="50cm" aria-label="50cm" color="warning">
            50cm
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography
          variant="subtitle1"
          component="p"
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Doors
        </Typography>
        <ToggleButtonGroup
          value={doors}
          exclusive
          onChange={handleDoors}
          aria-label="doors"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <ToggleButton value="None" aria-label="None" color="warning">
            None
          </ToggleButton>
          <ToggleButton value="Some" aria-label="Some" color="warning">
            Some
          </ToggleButton>
          <ToggleButton value="Max" aria-label="Max" color="warning">
            Max
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography
          variant="subtitle1"
          component="p"
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Drawers
        </Typography>
        <ToggleButtonGroup
          value={drawers}
          exclusive
          onChange={handleDrawers}
          aria-label="drawers"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
          color="warning"
        >
          <ToggleButton value="None" aria-label="None" color="warning">
            None
          </ToggleButton>
          <ToggleButton value="Some" aria-label="Some" color="warning">
            Some
          </ToggleButton>
          <ToggleButton value="Max" aria-label="Max" color="warning">
            Max
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Html>
  );
}

export default HoverModal;
