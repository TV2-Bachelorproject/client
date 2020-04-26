import React from "react";
import styled from "styled-components";

const StyledCardFooter = styled.footer`
  padding: 0 0 20px;
  margin: -20px 20px 0;
`;
export const CardFooter = ({ children }) => (
  <StyledCardFooter className="tc_card__footer">{children}</StyledCardFooter>
);
