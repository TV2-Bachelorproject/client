import React, { Component } from "react";
import styled from "styled-components";
import Heading from "../heading/Heading";
//import { Link, Router } from "react-router-dom";

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #343350;
  min-width: 250px;
  height: 100vh;
  box-sizing: border-box;
  line-height: 20px;
`;

const SidebarHeading = styled(Heading)`
  color: white;
  text-align: center;
`;

export default class Sidebar extends Component {
  /**
   * Render sidebar
   * @return {JSX}
   */
  render() {
    return (
      <StyledSidebar>
        <div className="sidebarTitle">
          <SidebarHeading level={3}>TV2</SidebarHeading>
        </div>
      </StyledSidebar>
    );
  }
}
