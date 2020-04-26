import React from "react";

import { action } from "@storybook/addon-actions";

import Anchor from "./Anchor";

export default {
  title: "Anchor",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const Default = () => (
  <Anchor href="/" onClick={action("Link clicked")}>
    Click me!
  </Anchor>
);
