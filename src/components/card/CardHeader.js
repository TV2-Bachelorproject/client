import React from "react";
import styled from "styled-components";

const StyledCardHeader = styled.header`
  padding: 20px 0 0;
  margin: 0 20px;
`;

export const CardHeader = ({ children }) => (
  <StyledCardHeader className="tc_card__header">{children}</StyledCardHeader>
);
