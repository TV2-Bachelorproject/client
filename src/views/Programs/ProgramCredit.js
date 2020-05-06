import React, { Component } from "react";
import styled from "styled-components";
import program from "../../api/program";
import auth from "../../api/auth";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import Datatable from "../../components/datatable/Datatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import credits from "../../api/credits";
import persons from "../../api/persons";

const BodyGrid = styled.div`
  background: white;
  grid-column: 1/3;
  border-radius: 25px;
  padding: 2.5em;
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-columns: 1fr 1fr 1fr;

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
  &:hover {
    background: red;
    opacity: 0.7;
    color: black;
  }
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

  accept = async () => {
    try {
      await program.acceptCredits(Number(this.props.match.params.id));
      this.loadCredits();
    } catch(e) {
      console.log(e)
    }
  }

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

  onSave = async () => {
    let credit = {
      programID: parseInt(this.props.match.params.id),
      persons: this.state.personOption.map((person) => person.id),
      creditGroupID: this.state.jobOption.id,
    };

    try {
      await credits.createCredit(credit);
      this.loadCredits();
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

          try {
            credits.deleteCredit({ personID: personID, creditID: creditID });
          } catch (e) {
            this.setState({
              error: "credit could not delete",
            });
          }

          return credit;
        }
      }),
    });
  };

  renderTables(credit, index) {
    if (credit.persons.length === 0) {
      return;
    }

    return (
      <StyledDatatable key={index}>
        <Heading level={2}>
          {credit.creditGroup.name}
          {credit.accepted && (
            <span style={{paddingLeft: '15px', color: 'green'}}><FontAwesomeIcon icon={faCheck} /></span>
          )}
        </Heading>
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

    let isOptionsSelected;
    let isCredits;

    if (this.state.personOption === null || this.state.jobOption === null) {
      isOptionsSelected = (
        <StyledButton disabled>Tilføj kreditering</StyledButton>
      );
    } else {
      isOptionsSelected = (
        <StyledButton primary onClick={this.onSave}>
          Tilføj kreditering
        </StyledButton>
      );
    }

    if (this.state.credits.length > 0) {
      isCredits = this.state.credits.map(this.renderTables.bind(this));
    } else {
      isCredits = (
        <Heading
          level={2}
          style={{ gridColumn: "span 3", placeSelf: "center" }}
        >
          Ingen krediteringer fundet
        </Heading>
      );
    }

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
              <b>Status:</b> {this.state.credits.length} krediteringer
            </StyledStatus>
          </div>
          <div>
            {auth.isAdmin() && (
              <Button onClick={this.accept} primary>Accepter</Button>
            )}
          </div>
        </TitleGrid>
        <BodyGrid>{isCredits}</BodyGrid>
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
          <FormGrid>{isOptionsSelected}</FormGrid>
        </RightGrid>
      </Layout>
    );
  }
}
