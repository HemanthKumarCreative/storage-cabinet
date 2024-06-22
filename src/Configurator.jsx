import React, { useState } from "react";
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

function Configurator() {
  const [configuration, setConfiguration] = useState({
    style: "",
    density: 31,
    width: 450,
    height: 293,
    depth: "24cm", // Initial depth value
    backPanel: "ON",
    finish: "Plywood",
    color: "",
  });

  const handleInputChange = (prop) => (event, newValue) => {
    setConfiguration({ ...configuration, [prop]: newValue });
  };

  const handleSelectChange = (prop) => (event, newValue) => {
    setConfiguration({
      ...configuration,
      [prop]: event.target.value,
    });
  };

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
              min={0}
              max={100}
              size="small"
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
              min={30}
              max={450}
              size="small"
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
              >
                24cm
              </ToggleButton>
              <ToggleButton
                value="32cm"
                aria-label="32cm"
                size="small"
                style={{ textTransform: "none" }}
              >
                32cm
              </ToggleButton>
              <ToggleButton
                value="40cm"
                aria-label="40cm"
                size="small"
                style={{ textTransform: "none" }}
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
              <ToggleButton value="OFF" aria-label="OFF" size="small">
                OFF
              </ToggleButton>
              <ToggleButton value="ON" aria-label="ON" size="small">
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
              >
                Plywood
              </ToggleButton>
              <ToggleButton
                value="Veneer"
                aria-label="Veneer"
                size="small"
                style={{ textTransform: "none" }}
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
          <Grid item xs={4}>
            <Typography variant="subtitle1">Colour</Typography>
          </Grid>
          <Grid item xs={6}>
            <ToggleButtonGroup
              value={configuration.color}
              onChange={handleSelectChange("color")}
              aria-label="color"
              fullWidth
            >
              <ToggleButton value="White" aria-label="White" size="small">
                White
              </ToggleButton>
              <ToggleButton value="Black" aria-label="Black" size="small">
                Black
              </ToggleButton>
              <ToggleButton value="Brown" aria-label="Brown" size="small">
                Brown
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Select the color of the cabinet">
              <HelpOutlineIcon fontSize="small" style={{ cursor: "pointer" }} />
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Configurator;
