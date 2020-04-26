import React from "react";
import TextInput from "./TextInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Text Input",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const Input = () => (
  <TextInput onChange={action("Button clicked")}>Input text here!</TextInput>
);
