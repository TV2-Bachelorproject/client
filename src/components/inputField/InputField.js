import styled from "styled-components";
import React from "react";

const StyledInputField = styled.input`
  padding: 0.85em 1.3em;
  margin: 0.5em;
  font-size: 0.9em;
  outline: none;
  color: ${props => props.inputColor || "#97959D"};
  background: #f5f6f8;
  border: none;
  border-radius: 15px;
  &:focus {
    box-shadow: #343350 0px 0px 0px 2px;
  }
`;

const InputField = () => {
  return <StyledInputField defaultValue="Insert your text!" type="text" />;
};

export default InputField;
