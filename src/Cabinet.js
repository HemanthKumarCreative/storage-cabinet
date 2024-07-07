import React from "react";
import StorageCabinet from "./Cabinets/StorageCabinet";
import SmallCabinet from "./Cabinets/SmallCabinet";
import OpenCabinet from "./Cabinets/OpenCabinet";
import DrawerCabinet from "./Cabinets/DrawerCabinet";

// Higher-Order Component
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
