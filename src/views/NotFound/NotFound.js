import React, { Component } from "react";

import Heading from "../../components/heading/Heading";
import Layout from "../../components/Layout/Layout";

export default class NotFound extends Component {
  /**
   * Render login view
   * @return {JSX}
   */
  render() {
    return (
      <Layout>
        <section
          style={{
            gridRow: 3,
            gridColumn: 2,
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <Heading level={2}>Page not found..</Heading>
        </section>
      </Layout>
    );
  }
}
