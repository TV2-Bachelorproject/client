import React from "react";
import InputField from "../inputField/InputField";
import { action } from "@storybook/addon-actions";

export default {
  title: "Input",
  decorators: [story => <div style={{ padding: "3rem" }}>{story()}</div>]
};

export const TextInput = () => (
  <InputField onChange={action("Button clicked")}>Input text here!</InputField>
);