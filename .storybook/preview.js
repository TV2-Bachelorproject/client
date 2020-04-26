// .storybook/preview.js
import { addParameters } from "@storybook/react";
import "../src/index.css";
import theme from "./theme";

addParameters({
  options: {
    isFullScreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: "right",
    sortStoriesByKind: false,
    sidebarAnimations: true,
    selectedPanel: undefined,
    enableShortcuts: true,
    theme: theme,
    showRoots: true,
  },
});
