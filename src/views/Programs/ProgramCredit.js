import React, { Component } from "react";
import styled from "styled-components";
import program from "../../api/program";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import Datatable from "../../components/datatable/Datatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import credits from "../../api/credits";
import persons from "../../api/persons";

const BodyGrid = styled.div`
  background: white;
  grid-column: 1/3;
  border-radius: 25px;
  padding: 2.5em;
  display: grid;
  grid-template-rows: repeat(auto-fill, 250px);
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(0, auto);
  grid-column-gap: 1em;
`;

const RightGrid = styled.div`
  background: white;
  align-self: start;
  grid-column: 3;
  border-radius: 25px;
  position: sticky;
  top: 0;
  padding: 2.5em;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
`;

const TitleGrid = styled.div`
  display: grid;
  grid-row: 2;
  background: white;
  border-radius: 25px;
  padding: 2.5em;
  grid-column: 1;
  align-self: start;
  grid-auto-rows: minmax(0, 30px);
  grid-template-columns: 1fr;
`;

const FormGrid = styled.div`
  display: grid;
  grid-auto-rows: minmax(0, auto);
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
`;

const StyledLabel = styled.label`
  padding-left: 0.5em;
  font-size: 0.8em;
  color: #75808e;
  text-transform: uppercase;
  padding-bottom: 0.8em;
`;

const StyledStatus = styled.span`
  font-size: 0.8em;
  color: #75808e;
  letter-spacing: 1px;
`;

const StyledButton = styled(Button)`
  align-self: end;
  justify-self: stretch;
  margin: 0;
  margin-bottom: 5px;
`;

const StyledDatatable = styled(Datatable)`
  table {
    padding: 15px 38px 15px 0px;
    font-size: 0.9em;
    color: black;
    text-transform: uppercase;
  }
  align-self: start;
  grid-column: 1/4;
  grid-auto-rows: minmax(0, auto);
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  margin-right: 5px;
  background: rgb(246, 245, 250);
  border-radius: 5px;
  padding: 8px;
  line-height: 15px;
  cursor: pointer;
`;

export default class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: [],
      options: [],
      person: {},
      program: [],
      persons: [],
      personOption: null,
      jobOption: null,
      error: null,
    };
  }

  componentDidMount() {
    this.init();
  }

  handleJobInput = (jobOption) => {
    this.setState({ jobOption });
  };

  handleChange = (personOption) => {
    this.setState({ personOption });
  };

  init = () => {
    this.loadProgram(this.props.match.params.id);
    this.loadGroups();
    this.loadPeople();
    this.loadCredits();
  };

  loadProgram = async (id) => {
    try {
      let res = await program.getProgram(id);
      this.setState({ program: res.data.program });
    } catch (e) {
      this.setState({
        error: "program not found",
      });
    }
  };

  loadGroups = async () => {
    try {
      let creditGroupRes = await credits.getCreditGroups();
      this.setState({ options: creditGroupRes });
    } catch (e) {
      this.setState({
        error: "no groups found",
      });
    }
  };

  loadPeople = async () => {
    try {
      let res = await persons.getPeople();
      this.setState({ persons: res });
    } catch (e) {
      this.setState({
        error: "no people found",
      });
    }
  };

  loadCredits = async () => {
    try {
      let res = await credits.getProgramCredits(this.props.match.params.id);
      this.setState({ credits: res.data.program.credits });
    } catch (e) {
      this.setState({
        error: "no credits found",
      });
    }
  };

  onCreatePerson = () => {
    let person = {};

    this.setState({ credits: [...this.state.credits, person] });
  };

  onSave = async () => {
    let credit = {
      programID: parseInt(this.props.match.params.id),
      persons: this.state.personOption.map((person) => person.id),
      creditGroupID: this.state.jobOption.id,
    };

    try {
      await credits.createCredit(credit);
    } catch (e) {
      this.setState({
        error: "Couldn't save!",
      });
    }

    this.setState({ personOption: null, jobOption: null });
  };

  renderOptions(group, index) {
    return (
      <option key={index} value={group.Name}>
        {group.Name}
      </option>
    );
  }

  removeCredit = (creditID, personID) => {
    this.setState({
      credits: this.state.credits.map((credit) => {
        if (credit.id !== creditID) {
          return credit;
        } else {
          credit.persons = credit.persons.filter(
            (person) => person.id !== personID
          );
          return credit;
        }
      }),
    });
  };

  renderTables(credit, index) {
    return (
      <StyledDatatable key={index}>
        <Heading level={2}>{credit.creditGroup.name}</Heading>
        <table>
          <thead>
            <tr>
              <th>NAVN</th>
              <th>KATEGORI</th>
              <th>HANDLING</th>
            </tr>
          </thead>
          <tbody>
            {credit.persons.map((person, index) =>
              this.renderRows(person, credit, index)
            )}
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </StyledDatatable>
    );
  }

  renderRows(person, credit, index) {
    return (
      <tr key={index}>
        <td>{person.name}</td>
        <td>{credit.creditGroup.name}</td>
        <td>
          <StyledFontAwesomeIcon
            onClick={() => this.removeCredit(credit.id, person.id)}
            icon={faTrashAlt}
            color="#75808e"
          />
        </td>
      </tr>
    );
  }

  render() {
    const { personOption } = this.state;
    const { jobOption } = this.state;

    return (
      <Layout>
        <Heading style={{ alignSelf: "end" }} level={1}>
          Program
        </Heading>
        <TitleGrid>
          <Heading style={{ margin: 0 }} level={3}>
            {this.state.program.title}
          </Heading>
          <div>
            <StyledStatus>
              <b>Status:</b> Godkendt
            </StyledStatus>
          </div>
        </TitleGrid>
        <BodyGrid>
          {this.state.credits.map(this.renderTables.bind(this))}
        </BodyGrid>
        <RightGrid>
          <FormGrid>
            <StyledLabel htmlFor="job">Krediteringskategori</StyledLabel>
            <Select
              id="job"
              placeholder="Vælg krediteringskategori"
              value={jobOption}
              onChange={this.handleJobInput}
              options={this.state.options.map((group) => ({
                label: group.Name,
                value: group.Name,
                id: group.ID,
              }))}
            ></Select>
          </FormGrid>
          <FormGrid>
            <StyledLabel htmlFor="person">Personer der krediteres</StyledLabel>
            <Select
              isMulti="true"
              id="person"
              placeholder="Vælg person/personer"
              value={personOption}
              onChange={this.handleChange}
              options={this.state.persons.map((person) => ({
                label: person.Name,
                value: person.Name,
                id: person.ID,
              }))}
            ></Select>
          </FormGrid>
          <FormGrid>
            <StyledButton primary onClick={this.onSave}>
              Tilføj kreditering
            </StyledButton>
          </FormGrid>
        </RightGrid>
      </Layout>
    );
  }
}
