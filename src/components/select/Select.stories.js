import React from "react";
import Select from "./Select";
import { action } from "@storybook/addon-actions";

export default {
  title: "Select",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const Default = () => (
  <Select onChange={action("Button clicked")}>Input text here!</Select>
);
