import React, { Component } from "react";
import Sidebar from "../sidebar/Sidebar";
import styled from "styled-components";

const StyledLayout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 150px;
  height: 100%;
  overflow-y: auto;
`;

export default class Layout extends Component {
  render() {
    return (
      <StyledLayout>
        <div className="view">{this.props.children}</div>
        <Sidebar />
      </StyledLayout>
    );
  }
}
