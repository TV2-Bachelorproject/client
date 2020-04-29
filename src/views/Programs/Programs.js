import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Datatable from "../../components/datatable/Datatable";
import TextInput from "../../components/textInput/TextInput";
import program from "../../api/program";
import moment from "moment";

const Grid = styled.div`
  grid-row: 2/4;
  grid-column: 1/3;
`;

export default class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      search: "",
      error: null,
    };
  }

  componentDidMount() {
    this.loadPrograms();
  }

  loadPrograms = async () => {
    try {
      let res = await program.getPrograms();
      this.setState({ programs: res.data.programs });
    } catch (e) {
      this.setState({
        error: "Programs not found!",
      });
    }
  };

  search = e => {
    this.setState({ search: e.target.value })
  }

  renderPrograms(program) {
    if (!program.title) {
      return;
    }

    return (
      <tr>
        <td>{program.id}</td>
        <td>{program.title}</td>
        <td>
          {program.airTimeFrom}
          {moment
            .unix(program.airTimeFrom)
            .format("dddd, MMMM Do, YYYY h:mm A")}{" "}
          til{" "}
          {moment.unix(program.airTimeTo).format("dddd, MMMM Do, YYYY h:mm A")}}{" "}
          {program.airTimeTo}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Layout>
        <Heading style={{ alignSelf: "end" }} level={1}>
          Programs
        </Heading>
        <TextInput style={{maxHeight: '30px', border: 'solid 1px #000', alignSelf: "end" }} text="Søg" onChange={this.search} />
        <Grid>
          <Datatable>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titel</th>
                  <th>Afspillet d.</th>
                </tr>
              </thead>
              <tbody>
                {this.state.programs.filter(p => p.title.toLowerCase().includes(this.state.search.toLowerCase())).map(this.renderPrograms.bind(this))}
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
