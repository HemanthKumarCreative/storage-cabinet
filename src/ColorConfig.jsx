import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({
  finish,
  handleSelectChange,
  color,
}) {
  const plywoodColors = [
    "green",
    "brown",
    "dusty pink",
    "grey",
    "yellow",
    "violet",
    "classic red",
    "dark brown",
  ];

  const veneerColors = ["Walnut", "Oak", "White oak"];
  const colors = finish === "Plywood" ? plywoodColors : veneerColors;

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Color</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleSelectChange("color")}
        color="warning"
      >
        {colors.map((c) => (
          <FormControlLabel
            value={c}
            control={<Radio color="warning" />}
            label={c}
            checked={color === c}
            color="warning"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
