import React from "react";

import { action } from "@storybook/addon-actions";

import Button from "../button/Button";

export default {
  title: "Button"
};

export const Primary = () => (
  <Button primary onClick={action("Button clicked")}>
    Click me!
  </Button>
);

export const Secondary = () => (
  <Button color="secondary" onClick={action("Secondary button clicked")}>
    Secondary
  </Button>
);

export const Disabled = () => (
  <Button onClick={action("Secondary button clicked")} disabled>
    Disabled
  </Button>
);
