import React from "react";
import { Grid } from "./Grid";

export default {
  title: "Grid",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const Default = () => <Grid>This is the grid</Grid>;
