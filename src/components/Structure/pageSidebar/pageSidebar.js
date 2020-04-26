import React from "react";
import styled from "styled-components";

const StyledSidebar = styled.aside`
  display: grid;
  grid-template-rows: 1fr 8fr 2fr;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(0px, auto);
  background: white;
  justify-items: stretch;
`;

export const PageSidebar = ({ children }) => (
  <StyledSidebar tag="aside" className="tc_page__sidebar">
    {children}
  </StyledSidebar>
);
