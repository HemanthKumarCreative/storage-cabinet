import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ColorConfig from "./ColorConfig";
import { color } from "three/examples/jsm/nodes/Nodes.js";
import { BsGrid3X3 } from "react-icons/bs";
import { FcExport } from "react-icons/fc";
import { MdOutlineResetTv } from "react-icons/md";
import { styled } from "@mui/material/styles";

function Configurator({
  configuration,
  setConfiguration,
  exportGLTF,
  handleReset,
  controlsRef,
  resetScene,
}) {
  const handleInputChange = (prop) => (event, newValue) => {
    setConfiguration({ ...configuration, [prop]: newValue });
  };

  const handleSelectChange = (prop) => (event, newValue) => {
    setConfiguration({
      ...configuration,
      [prop]: event.target.value,
    });
  };

  const heightMap = [
    { value: 150, label: "" },
    { value: 180, label: "" },
    { value: 210, label: "" },
    { value: 240, label: "" },
    { value: 270, label: "" },
    { value: 300, label: "" },
  ];

  const widthMap = [
    { value: 50, label: "" },
    { value: 150, label: "" },
    { value: 250, label: "" },
    { value: 350, label: "" },
    { value: 400, label: "" },
    { value: 450, label: "" },
  ];

  const densityMap = [
    { value: 50, label: "" },
    { value: 75, label: "" },
    { value: 100, label: "" },
  ];

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <Card
      style={{
        width: 550,
        height: "100%",
        margin: 10,
        overflow: "auto",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <BootstrapTooltip title="Export the Current Scene as GLB" arrow>
              <ToggleButton
                value="export"
                aria-label="Export"
                size="small"
                onClick={exportGLTF}
              >
                <FcExport style={{ fontSize: "20px", color: "#b84b4a" }} />
              </ToggleButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Reset the Scene to Initial State">
              <ToggleButton
                value="export"
                aria-label="Export"
                size="small"
                onClick={resetScene}
              >
                <MdOutlineResetTv
                  style={{ fontSize: "20px", color: "#b84b4a" }}
                />
              </ToggleButton>
            </BootstrapTooltip>
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Custom Configuration
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {/* Style */}
          {/* <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Export</Typography>
          </Grid> */}

          {/* <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Style</Typography>
          </Grid> */}
          {/* <Grid item xs={2}>
            <ToggleButtonGroup
              value={configuration.style}
              onChange={handleSelectChange("style")}
              aria-label="style"
            >
              <ToggleButton
                value="grid"
                aria-label="Grid"
                size="small"
                disabled={configuration.style === "grid"}
              >
                <BsGrid3X3 style={{ fontSize: "20px", color: "#b84b4a" }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid> */}

          {/* Density */}
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Density</Typography>
          </Grid>
          <Grid item xs={6}>
            <Slider
              value={configuration.density}
              onChange={handleInputChange("density")}
              valueLabelDisplay="auto"
              aria-labelledby="density-slider"
              min={50}
              max={100}
              size="small"
              step={null}
              marks={densityMap}
              // disabled={true}
              color="warning"
            />
          </Grid>
          <Grid item xs={2}>
            <BootstrapTooltip title="Set the density of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid>

          {/* Width */}
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Width</Typography>
          </Grid>
          <Grid item xs={6}>
            <Slider
              value={configuration.width}
              onChange={handleInputChange("width")}
              valueLabelDisplay="auto"
              aria-labelledby="width-slider"
              min={50}
              max={450}
              size="small"
              step={null}
              marks={widthMap}
              color="warning"
            />
          </Grid>
          <Grid item xs={2}>
            <BootstrapTooltip title="Adjust the width of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid>

          {/* Height */}
          <Grid item xs={4}>
            <Typography variant="subtitle1">Height</Typography>
          </Grid>
          <Grid item xs={6}>
            <Slider
              value={configuration.height}
              onChange={handleInputChange("height")}
              valueLabelDisplay="auto"
              aria-labelledby="height-slider"
              min={150}
              max={300}
              step={null}
              marks={heightMap} // Add marks to show stepper behavior
              size="small"
              color="warning"
            />
          </Grid>
          <Grid item xs={2}>
            <BootstrapTooltip title="Set the height of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid>

          {/* Depth */}
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Depth</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.depth}
              onChange={handleSelectChange("depth")}
              aria-label="depth"
              fullWidth
            >
              <ToggleButton
                value="24cm"
                aria-label="24cm"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.depth === "24cm"}
                color="warning"
              >
                24cm
              </ToggleButton>
              <ToggleButton
                value="32cm"
                aria-label="32cm"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.depth === "32cm"}
                color="warning"
              >
                32cm
              </ToggleButton>
              <ToggleButton
                value="40cm"
                aria-label="40cm"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.depth === "40cm"}
                color="warning"
              >
                40cm
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <BootstrapTooltip title="Select the depth of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid>

          {/* Back Panel */}
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Back panels</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.backPanel}
              onChange={handleSelectChange("backPanel")}
              aria-label="backPanel"
              fullWidth
            >
              <ToggleButton
                value="OFF"
                aria-label="OFF"
                size="small"
                disabled={configuration.backPanel === "OFF"}
                color="warning"
              >
                OFF
              </ToggleButton>
              <ToggleButton
                value="ON"
                aria-label="ON"
                size="small"
                disabled={configuration.backPanel === "ON"}
                color="warning"
              >
                ON
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <BootstrapTooltip title="Select the back panel material">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid>

          {/* Finish */}
          <Grid item xs={4}>
            <Typography variant="subtitle1">Finish</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.finish}
              onChange={handleSelectChange("finish")}
              aria-label="finish"
              fullWidth
            >
              <ToggleButton
                value="Plywood"
                aria-label="Plywood"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.finish === "Plywood"}
                color="warning"
              >
                Plywood
              </ToggleButton>
              <ToggleButton
                value="Veneer"
                aria-label="Veneer"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.finish === "Veneer"}
                color="warning"
              >
                Veneer
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <BootstrapTooltip title="Choose the finish of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid>

          {/* Color */}
          {/* <Grid item xs={4}>
            <Typography variant="subtitle1">Colour</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <ColorConfig
              finish={configuration.finish}
              handleSelectChange={handleSelectChange}
              color={configuration.color}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <BootstrapTooltip title="Select the color of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </BootstrapTooltip>
          </Grid> */}
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Objects Visibility</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.books}
              onChange={handleSelectChange("books")}
              aria-label="books"
              fullWidth
            >
              <ToggleButton
                value="OFF"
                aria-label="OFF"
                size="small"
                disabled={configuration.books === "OFF"}
                color="warning"
              >
                OFF
              </ToggleButton>
              <ToggleButton
                value="ON"
                aria-label="ON"
                size="small"
                disabled={configuration.books === "ON"}
                color="warning"
              >
                ON
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Dimensions</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.dimensions}
              onChange={handleSelectChange("dimensions")}
              aria-label="dimensions"
              fullWidth
            >
              <ToggleButton
                value="OFF"
                aria-label="OFF"
                size="small"
                disabled={configuration.dimensions === "OFF"}
                color="warning"
              >
                OFF
              </ToggleButton>
              <ToggleButton
                value="ON"
                aria-label="ON"
                size="small"
                disabled={configuration.dimensions === "ON"}
                color="warning"
                onClick={handleReset}
              >
                ON
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {configuration.dimensions === "ON" && (
            <>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">Units</Typography>
              </Grid>
              <Grid item xs={6}>
                <ToggleButtonGroup
                  value={configuration.units}
                  onChange={handleSelectChange("units")}
                  aria-label="units"
                  fullWidth
                >
                  <ToggleButton
                    value="cm"
                    aria-label="cm"
                    size="small"
                    disabled={configuration.units === "cm"}
                    color="warning"
                  >
                    cm
                  </ToggleButton>
                  <ToggleButton
                    value="ft. inc."
                    aria-label="ft. inc."
                    size="small"
                    disabled={configuration.units === "ft. inc."}
                    color="warning"
                  >
                    ft. inc.
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Configurator;
