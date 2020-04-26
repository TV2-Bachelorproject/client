import React from "react";
import styled from "styled-components";

const StyledCardBody = styled.div`
  padding: 20px 0;
  margin: 0 20px;
`;

export const CardBody = ({ children }) => (
  <StyledCardBody className="tc_card__body">{children}</StyledCardBody>
);

CardBody.defaultProps = {
  children: null,
};
