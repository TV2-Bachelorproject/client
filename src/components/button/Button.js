import styled from "styled-components";

const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "#343350" : "white")};
  color: ${(props) => (props.primary ? "white" : "#343350")};
  font-size: 1em;
  font-weight: 700;
  margin: auto;
  padding: 0.5em 1.5em;
  border: 2px solid #343350;
  border-radius: 15px;
  cursor: pointer;
  text-transform: none;
  outline: none;
  &:disabled {
    cursor: auto;
    opacity: 0.3;
    box-shadow: #343350 0px 0px 0px 0px;
  }
  &:hover:enabled {
    box-shadow: #343350 0px 0px 0px 2px;
  }
`;

export default StyledButton;
