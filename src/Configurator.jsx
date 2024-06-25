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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ColorConfig from "./ColorConfig";

function Configurator({ configuration, setConfiguration }) {
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
    { value: 183, label: "" },
    { value: 223, label: "" },
    { value: 253, label: "" },
    { value: 293, label: "" },
    { value: 323, label: "" },
    { value: 363, label: "" },
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
    { value: 25, label: "" },
    { value: 50, label: "" },
    { value: 75, label: "" },
    { value: 100, label: "" },
  ];

  return (
    <Card style={{ width: 550, height: "100%", margin: 10, overflow: "auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Custom Configuration
        </Typography>
        <Grid container spacing={2}>
          {/* Style */}
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Style</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.style}
              onChange={handleSelectChange("style")}
              aria-label="style"
              fullWidth
            >
              <ToggleButton value="Modern" aria-label="Modern" size="small">
                Modern
              </ToggleButton>
              <ToggleButton value="Vintage" aria-label="Vintage" size="small">
                Vintage
              </ToggleButton>
              <ToggleButton
                value="Minimalist"
                aria-label="Minimalist"
                size="small"
              >
                Minimalist
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>

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
              min={25}
              max={100}
              size="small"
              step={null}
              marks={densityMap}
              disabled={true}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Set the density of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
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
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Adjust the width of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
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
              min={183}
              max={363}
              step={null}
              marks={heightMap} // Add marks to show stepper behavior
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Set the height of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
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
              >
                24cm
              </ToggleButton>
              <ToggleButton
                value="32cm"
                aria-label="32cm"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.depth === "32cm"}
              >
                32cm
              </ToggleButton>
              <ToggleButton
                value="40cm"
                aria-label="40cm"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.depth === "40cm"}
              >
                40cm
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Select the depth of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
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
              >
                OFF
              </ToggleButton>
              <ToggleButton
                value="ON"
                aria-label="ON"
                size="small"
                disabled={configuration.backPanel === "ON"}
              >
                ON
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Select the back panel material">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
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
              >
                Plywood
              </ToggleButton>
              <ToggleButton
                value="Veneer"
                aria-label="Veneer"
                size="small"
                style={{ textTransform: "none" }}
                disabled={configuration.finish === "Veneer"}
              >
                Veneer
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Choose the finish of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
          </Grid>

          {/* Color */}
          {/* <Grid item xs={4}>
            <Typography variant="subtitle1">Colour</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <ColorConfig finish={configuration.finish} />
          </Grid>
          {/* <Grid item xs={2}>
            <Tooltip title="Select the color of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Configurator;
