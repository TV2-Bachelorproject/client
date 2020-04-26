import React from "react";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import Datatable from "../datatable/Datatable";

const StyledBox = styled.div`
  grid-row: 2/4;
  grid-column: 1/3;
`;
export default {
  title: "Layout",
};

export const WithSidebar = () => (
  <Layout>
    <h1>Productions</h1>
    <StyledBox>
      <Datatable>
        <table>
          <caption>Caption</caption>
          <thead>
            <tr>
              <th>Th</th>
              <th>Th</th>
              <th>Th</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Td</td>
              <td>Td</td>
              <td>Td</td>
            </tr>
            <tr>
              <td>Td</td>
              <td>Td</td>
              <td>Td</td>
            </tr>
            <tr>
              <td>Td</td>
              <td>Td</td>
              <td>Td</td>
            </tr>
            <tr>
              <td>Td</td>
              <td>Td</td>
              <td>Td</td>
            </tr>
            <tr>
              <td>Td</td>
              <td>Td</td>
              <td>Td</td>
            </tr>
            <tr>
              <td>Td</td>
              <td>Td</td>
              <td>Td</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Footer</td>
            </tr>
          </tfoot>
        </table>
      </Datatable>
    </StyledBox>
  </Layout>
);
