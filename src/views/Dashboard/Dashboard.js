import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Datatable from "../../components/datatable/Datatable";
import program from "../../api/program";
import Moment from "react-moment";

const StyledLayout = styled(Layout)`
  grid-template-rows: 1fr 0.5fr 2fr 2fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const TitleGrid = styled.div`
  display: grid;
  grid-column: span 2;
  background: white;
  border-radius: 25px;
  padding: 2.5em;
  align-self: start;
  grid-auto-rows: minmax(0, 30px);
  grid-template-columns: 1fr 1fr;
`;

const DoubleGrid = styled.div`
  display: grid;
  grid-column: span 3;
  background: white;
  border-radius: 25px;
  padding: 2.5em;
  align-self: start;
  justify-self: stretch;
  grid-auto-rows: minmax(0, auto);
  grid-template-columns: 1fr 1fr;
`;

const StyledDatatable = styled(Datatable)`
  table {
    padding: 1em 0px;
    font-size: 0.9em;
    color: black;
    text-transform: uppercase;
  }
  grid-row: 3/4;
  grid-column: 1/4;
  grid-auto-rows: minmax(0, auto);
`;

const StyledStatus = styled.span`
  font-size: 0.8em;
  color: #5c69e0;
  letter-spacing: 1px;
`;

const SmallText = styled.span`
  font-size: 0.8em;
  color: #75808e;
  letter-spacing: 1px;
  line-height: 20px;
`;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
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

  renderPrograms(program) {
    if (!program.title) {
      return;
    }

    return (
      <tr>
        <td>{program.title}</td>
        <td>
          {" "}
          <Moment local unix>
            {program.airTimeFrom}
          </Moment>
        </td>
        <td>
          <a href={"/program/" + program.id}>T</a>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <StyledLayout>
        <Heading style={{ alignSelf: "end", gridColumn: "1/6" }} level={1}>
          Dashboard
        </Heading>
        <TitleGrid>
          <StyledStatus style={{ color: "black", fontWeight: "800" }}>
            KREDITERINGER
          </StyledStatus>
          <Heading style={{ margin: 0, gridColumn: "1/3" }} level={3}>
            30
          </Heading>
          <div style={{ gridColumn: "1/3" }}>
            <StyledStatus>AFVENTER GODKENDELSE</StyledStatus>
          </div>
          <div
            style={{
              display: "grid",
              justifySelf: "start",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <SmallText style={{ borderRight: "2px solid #f5f5f5" }}>
              <b>10</b>
              <br /> NYE
            </SmallText>
            <SmallText style={{ marginLeft: "15px" }}>
              <b>10</b>
              <br /> AFSLÅET
            </SmallText>
          </div>
        </TitleGrid>
        <TitleGrid>
          <StyledStatus style={{ color: "black", fontWeight: "800" }}>
            PROGRAMMER I DAG
          </StyledStatus>
          <Heading style={{ margin: 0, gridColumn: "1/3" }} level={3}>
            14
          </Heading>
          <div style={{ gridColumn: "1/3" }}>
            <StyledStatus>AFVENTER KREDITERING</StyledStatus>
          </div>
          <div
            style={{
              display: "grid",
              justifySelf: "start",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <SmallText style={{ borderRight: "2px solid #f5f5f5" }}>
              <b>10</b>
              <br /> NYE
            </SmallText>
            <SmallText style={{ marginLeft: "15px" }}>
              <b>10</b>
              <br /> AFSLÅET
            </SmallText>
          </div>
        </TitleGrid>
        <TitleGrid>
          <StyledStatus style={{ color: "black", fontWeight: "800" }}>
            BESPARELSER
          </StyledStatus>
          <Heading style={{ margin: 0, gridColumn: "1/3" }} level={3}>
            80%
          </Heading>
          <div style={{ gridColumn: "1/3" }}>
            <StyledStatus>BESPARELSE I TV-TID</StyledStatus>
          </div>
          <div
            style={{
              display: "grid",
              justifySelf: "start",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <SmallText style={{ borderRight: "2px solid #f5f5f5" }}>
              <b style={{ color: "green", opacity: "0.7" }}>+10%</b>
              <br /> 2020
            </SmallText>
            <SmallText style={{ marginLeft: "15px" }}>
              <b style={{ color: "RED", opacity: "0.7" }}>-10%</b>
              <br /> 2019
            </SmallText>
          </div>
        </TitleGrid>
        <DoubleGrid>
          <Heading style={{ margin: 0, gridColumn: "1" }} level={4}>
            PROGRAMMER I DAG
          </Heading>
          <StyledDatatable>
            <table>
              <tbody>
                {this.state.programs
                  .slice(0, 5)
                  .map(this.renderPrograms.bind(this))}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </StyledDatatable>
        </DoubleGrid>
        <DoubleGrid>
          <Heading style={{ margin: 0, gridColumn: "1" }} level={4}>
            PROGRAMMER I DAG
          </Heading>

          <StyledDatatable>
            <table>
              <tbody>
                {this.state.programs
                  .slice(0, 5)
                  .map(this.renderPrograms.bind(this))}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </StyledDatatable>
        </DoubleGrid>
      </StyledLayout>
    );
  }
}
