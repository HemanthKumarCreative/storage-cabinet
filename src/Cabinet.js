import React from "react";
import StorageCabinet from "./Cabinets/StorageCabinet";
import SmallCabinet from "./Cabinets/SmallCabinet";
import OpenCabinet from "./Cabinets/OpenCabinet";
import DrawerCabinet from "./Cabinets/DrawerCabinet";

/**
 * Higher-Order Component that returns the appropriate cabinet component based on the `cabinetType` prop.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.cabinetType - The type of cabinet to render. Can be "storage", "open", "drawer", or "small".
 * @param {...object} rest - The rest of the props to be passed down to the cabinet component.
 *
 * @returns {React.Element} The appropriate cabinet component based on the `cabinetType` prop.
 */
const Cabinet = (props) => {
  const { cabinetType, ...rest } = props;

  // Switch case to return the appropriate component
  switch (cabinetType) {
    case "storage":
      return <StorageCabinet {...rest} />;
    case "open":
      return <OpenCabinet {...rest} />;
    case "drawer":
      return <DrawerCabinet {...rest} />;
    case "small":
      return <SmallCabinet {...rest} />;
    default:
      return <StorageCabinet {...rest} />;
  }
};

export default Cabinet;
