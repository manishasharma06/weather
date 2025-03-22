import React, { useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import "./LocationForm.css";

const SelectLocation = (props) => {
  const onValueChange = (e, { value }) => props.sendVal(value);

  return (
    <Dropdown
      placeholder="Select Airport"
      fluid
      search
      selection
      options={props.airportOptions}
      onChange={onValueChange}
    />
  );
};

export default SelectLocation;
