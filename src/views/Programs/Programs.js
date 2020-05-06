import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Datatable from "../../components/datatable/Datatable";
import TextInput from "../../components/textInput/TextInput";
import program from "../../api/program";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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

  search = (e) => {
    this.setState({ search: e.target.value });
  };

  renderPrograms(program, index) {
    if (!program.title) {
      return;
    }

    return (
      <tr key={index}>
        <td>{program.title}</td>
        <td>
          {" "}
          <Moment unix local format="DD/MM ">
            {program.airTimeFrom / 1000}
          </Moment>
        </td>
        <td>
          <Moment unix local format="HH:mm ">
            {program.airTimeFrom / 1000}
          </Moment>{" "}
          -{" "}
          <Moment unix local format="HH:mm">
            {program.airTimeTo / 1000}
          </Moment>
        </td>
        <td>
          {(program.credits.length > 0 &&
            program.credits.every((credit) => credit.accepted) && (
              <span
                style={{
                  color: "white",
                  background: "green",
                  paddingLeft: "1em",
                  paddingRight: "1em",
                  borderRadius: "15px",
                }}
              >
                Accepteret
              </span>
            )) || (
            <span
              style={{
                color: "white",
                background: "grey",
                paddingLeft: "1em",
                paddingRight: "1em",
                borderRadius: "15px",
              }}
            >
              Afventer
            </span>
          )}
        </td>
        <td>
          <a href={"/program/" + program.id}>
            <FontAwesomeIcon
              icon={faPen}
              style={{
                fontSize: "15px",
                marginRight: "5px",
                background: "rgb(246, 245, 250)",
                borderRadius: "5px",
                padding: "8px",
                lineHeight: "15px",
              }}
              color="#75808e"
            />
          </a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Layout>
        <Heading style={{ alignSelf: "end" }} level={1}>
          Programmer
        </Heading>
        <TextInput
          style={{
            maxHeight: "30px",
            background: "white",
            alignSelf: "end",
          }}
          text="Søg"
          onChange={this.search}
        />
        <Grid>
          <Datatable>
            <table>
              <thead>
                <tr>
                  <th>Titel</th>
                  <th>Dato</th>
                  <th>Tidspunkt</th>
                  <th>Status</th>
                  <th>Handling</th>
                </tr>
              </thead>
              <tbody>
                {this.state.programs
                  .filter((p) =>
                    p.title
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())
                  )
                  .map(this.renderPrograms.bind(this))}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </Datatable>
        </Grid>
      </Layout>
    );
  }
}
