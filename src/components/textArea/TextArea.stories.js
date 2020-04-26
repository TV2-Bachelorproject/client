import React from "react";
import TextArea from "./TextArea";
import { action } from "@storybook/addon-actions";

export default {
  title: "TextArea",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const TextAreaInput = () => (
  <TextArea onChange={action("Button clicked")}>Input text here!</TextArea>
);
