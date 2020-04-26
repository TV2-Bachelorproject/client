import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Datatable from "../../components/datatable/Datatable";
import productions from "../../api/productions";

const Grid = styled.div`
  grid-row: 2/4;
  grid-column: 1/3;
`;

export default class Productions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productions: [],
      error: null,
    };
  }

  componentDidMount() {
    this.loadProductions();
  }

  loadProductions = async () => {
    try {
      let res = await productions.getProductions();
      this.setState({ productions: res.data.productions });
    } catch (e) {
      this.setState({
        error: "Productions not found!",
      });
    }
  };

  renderProductions(production) {
    if (!production.producedBy) {
      return;
    }
    return (
      <tr>
        <td>{production.id}</td>
        <td>{production.producedBy}</td>
        <td>{production.editor}</td>
      </tr>
    );
  }

  render() {
    return (
      <Layout>
        <Heading style={{ alignSelf: "end" }} level={1}>
          Productions
        </Heading>
        <Grid>
          <Datatable>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producent</th>
                  <th>Editor</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productions.map(this.renderProductions.bind(this))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Footer</td>
                </tr>
              </tfoot>
            </table>
          </Datatable>
        </Grid>
      </Layout>
    );
  }
}
