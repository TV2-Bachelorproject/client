import SearchSelect from "react-select";
import React from "react";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f5f6f8",
    fontSize: "0.9em",
    outline: "none",
    border: "none",
    paddingLeft: "0.6em",
    marginLeft: "0.0em",
    minHeight: "45px",
    borderRadius: "10px",
  }),
  option: (provided, state) => ({
    ...provided,
    background: "white",
    borderBottom: "1px solid #f5f6f8",
    color: state.isSelected ? "black" : "black",
    padding: 15,
  }),
};

const Select = ({ children, ...rest }) => {
  return (
    <SearchSelect styles={colourStyles} {...rest}>
      {children}
    </SearchSelect>
  );
};

export default Select;
