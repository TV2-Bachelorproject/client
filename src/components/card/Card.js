import styled from "styled-components";
import React from "react";

const StyledCard = styled.div`
  background-color: white;
`;

const Card = ({ className, children, ...rest }) => {
  return (
    <StyledCard className={"tc_card " + className} {...rest}>
      {children}
    </StyledCard>
  );
};

Card.defaultProps = {
  className: "",
};

export default Card;
