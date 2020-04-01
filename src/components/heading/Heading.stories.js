import React from "react";
import Heading from "../heading/Heading";

export default {
  title: "Heading",
  decorators: [story => <div style={{ padding: "3rem" }}>{story()}</div>]
};

const H = ({ level }) => <Heading level={level}>{`Heading ${level}`}</Heading>;

//List headings from 1 - 6
export const All = ({ size }) => (
  <div>
    {[1, 2, 3, 4, 5, 6].map(level => (
      <H key={level} level={level} />
    ))}
  </div>
);
