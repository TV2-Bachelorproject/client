import styled from "styled-components";
import React from "react";

const StyledHeading = styled.h1`
  font-family: montserrat;
  color: #343350;
`;

const Heading = ({ level, ...rest }) => {
  return <StyledHeading as={`h${level}`} {...rest} />;
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
