import Card from "../card/Card";
import { CardBody } from "../card/CardBody";
import { CardFooter } from "../card/CardFooter";
import { CardHeader } from "../card/CardHeader";
import Heading from "../heading/Heading";
import React from "react";

export default {
  title: "Card",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

export const Default = ({ size }) => (
  <div style={{ maxWidth: "650px", margin: "0 auto" }}>
    <Card>
      <CardHeader>
        <Heading level={3} line>
          Card header
        </Heading>
      </CardHeader>
      <CardBody>Card body</CardBody>
      <CardFooter>Card footer</CardFooter>
    </Card>
  </div>
);
