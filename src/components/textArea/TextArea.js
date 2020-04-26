import styled from "styled-components";
import React from "react";

const StyledTextArea = styled.textarea`
  padding: 0.85em 1.3em;
  margin: 0.5em;
  font-size: 0.9em;
  outline: none;
  color: ${(props) => props.inputColor || "#97959D"};
  background: #f5f6f8;
  border: none;
  border-radius: 15px;
  width: 500px;
  height: 150px;
  resize: vertical;
  &:focus {
    box-shadow: #343350 0px 0px 0px 2px;
  }
`;

const TextArea = () => {
  return (
    <StyledTextArea
      placeholder="Insert your text!"
      type="text"
      cols="50"
      rows="5"
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = "Insert your text!")}
    />
  );
};

export default TextArea;
