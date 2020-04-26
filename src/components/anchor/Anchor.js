import styled from "styled-components";

const StyledAnchor = styled.a`
  box-sizing: border-box;
  font-size: inherit;
  line-height: inherit;
  color: #75808e;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  font-family: AlrightSansLT, -apple-system, ".SFNSText-Regular",
    "San Francisco", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Lucida Grande", "Arial", sans-serif;
  &:hover {
    color: #343350;
  }
`;

export default StyledAnchor;
