import Datatable from "../datatable/Datatable";
import React from "react";

export default {
  title: "Datatable",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const Default = () => (
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
);
