import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/**
 * RowRadioButtonsGroup component renders a group of radio buttons for selecting colors based on the finish type.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.finish - The type of finish ("Plywood" or "Veneer") to determine the available colors.
 * @param {function} props.handleSelectChange - The function to handle changes when a radio button is selected.
 * @param {string} props.color - The currently selected color.
 *
 * @returns {React.Element} The rendered component.
 */
export default function RowRadioButtonsGroup({ finish, handleSelectChange, color }) {
  // Define colors for each finish type
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
  
  // Select colors based on the finish type
  const colors = finish === "Plywood" ? plywoodColors : veneerColors;

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Color</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleSelectChange("color")}
      >
        {colors.map((c) => (
          <FormControlLabel
            key={c} // Add a unique key to each element
            value={c}
            control={<Radio color="warning" />}
            label={c}
            checked={color === c}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
