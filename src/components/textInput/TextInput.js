import styled from "styled-components";
import React from "react";

const StyledTextInput = styled.input`
  padding-left: 1.3em;
  font-size: 0.9em;
  outline: none;
  color: ${(props) => props.inputColor || "#97959D"};
  background: #f5f6f8;
  border: none;
  border-radius: 10px;
  min-height: 45px;
`;

const TextInput = ({ text, ...rest }) => {
  return (
    <StyledTextInput
      type="text"
      placeholder={text || "Insert text here!"}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = text || "Insert text here!")}
      {...rest}
    />
  );
};

export default TextInput;
