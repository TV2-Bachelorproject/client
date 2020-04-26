import React from "react";
import styled from "styled-components";
import { Grid } from "../../grid/Grid";

const StyledBody = styled(Grid)`
  display: grid;
  grid-template-rows: 1fr 8fr 2fr;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(0px, auto);
  background: white;
  justify-items: stretch;
`;

export const PageBody = ({ children }) => (
  <StyledBody tag="div" className="page__body">
    {children}
  </StyledBody>
);
