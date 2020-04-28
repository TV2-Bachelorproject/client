import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Grid } from "../grid/Grid";
import styled from "styled-components";
import { PageSidebar } from "../Structure/pageSidebar/pageSidebar";
import Heading from "../heading/Heading";
import Anchor from "../anchor/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBuilding,
  faFileVideo,
  faUser,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

const StyledList = styled.ul`
  list-style-type: none;
  padding-inline-start: 0px;
`;

const StyledAnchor = styled(Anchor)`
  padding: 15px 10px 15px 40px;
  display: block;
  &:hover,
  &:focus {
    padding: 15px 10px 15px 37px;
    background-color: #f6f5fa;
    border-left: solid 3px #5c69e0;
  }
`;

const BottomMenu = styled.div`
  align-self: start;
  border-top: 1px solid #f6f5fa;
`;

const StyledHeading = styled(Heading)`
  background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='40' viewBox='0 0 90 40' aria-labelledby='tv2logo'%3E%3Ctitle id='tv2logo'%3ETV 2 Logo%3C/title%3E%3Cpath fill='%23d21e1e' d='M89.992 10.172c.3 7.647-8.03 14.59-16.056 14.59h-20.62l5.656-8.324c.44-.663 1.464-1.2 2.274-1.2H75.57c1.847 0 3.85-1.693 3.666-3.555-.155-1.495-1.364-2.144-2.657-2.16H44.55L50.205 1.2C50.66.535 51.668 0 52.478 0h26.26c5.657 0 11.014 4.135 11.254 10.172zm-51.81-1.847L43.84 0H7.93c-.797 0-1.82.536-2.274 1.2L0 9.522h35.91c.81 0 1.82-.535 2.273-1.198zM17.877 40h16.27c.796 0 1.82-.535 2.274-1.2l16-23.562h-10.3c-.797 0-1.82.537-2.275 1.2L25.763 37.164l2.33-21.926h-10.67L15.12 36.966C14.95 38.646 16.17 40 17.876 40zm61.076-1.213l5.655-8.325H50.9c-.795 0-1.818.538-2.272 1.2l-5.657 8.325H76.68c.81.013 1.833-.522 2.274-1.2z'/%3E%3C/svg%3E")
    no-repeat 20% 50%;
  background-size: auto 15px;
`;

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  padding-left: 4em;
`;

export default class Layout extends Component {
  /**
   * Producer list of menu items
   * @type {Array}
   */
  producer = [
    ["Dashboard", "/", faBars, "20px"],
    ["Produktioner", "/productions", faBuilding, "20px"],
    ["Programmer", "/programs", faFileVideo, "20px"],
  ];

  /**
   * Settings list of menu items
   * @type {Array}
   */
  userDetails = [
    ["Bruger", "/", faUser, "20px"],
    ["Indstillinger", "/Indstillinger", faTools, "20px"],
  ];

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to='/login' />
    }


    return (
      <Grid tag="div">
        <PageSidebar>
          <StyledHeading
            level={3}
            style={{
              padding: "15px 10px 15px 85px",
              display: "block",
            }}
          >
            Credits
          </StyledHeading>
          <StyledList>
            {this.producer.map(([title, path, icon], index) => (
              <li
                key={index}
                style={{
                  cursor: "pointer",
                }}
              >
                <StyledAnchor href={path}>
                  <FontAwesomeIcon
                    icon={icon}
                    style={{ fontSize: "19px", marginRight: "15px" }}
                    color="#75808e"
                  />
                  {title}
                </StyledAnchor>
              </li>
            ))}
          </StyledList>
          <BottomMenu>
            <StyledList>
              {this.userDetails.map(([title, path, icon], index) => (
                <li key={index} style={{ cursor: "pointer" }}>
                  <StyledAnchor href={path}>
                    <FontAwesomeIcon
                      icon={icon}
                      style={{ fontSize: "19px", marginRight: "15px" }}
                      color="#75808e"
                    />
                    {title}
                  </StyledAnchor>
                </li>
              ))}
            </StyledList>
          </BottomMenu>
        </PageSidebar>
        <StyledLayout className="view" style={{ background: "#f6f5fa" }}>
          {this.props.children}
        </StyledLayout>
      </Grid>
    );
  }
}
