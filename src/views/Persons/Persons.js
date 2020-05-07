import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import Heading from "../../components/heading/Heading";
import Datatable from "../../components/datatable/Datatable";
import TextInput from "../../components/textInput/TextInput";
import persons from "../../api/persons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/Button";

const Grid = styled.div`
  grid-row: 2/4;
  grid-column: 1/3;
`;

const RightGrid = styled.div`
  background: white;
  align-self: start;
  grid-column: 3;
  grid-row: 2;
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

const StyledLabel = styled.label`
  padding-left: 0.5em;
  font-size: 0.8em;
  color: #75808e;
  text-transform: uppercase;
  padding-bottom: 0.8em;
`;

const FormGrid = styled.div`
  display: grid;
  grid-auto-rows: minmax(0, auto);
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
`;

const StyledButton = styled(Button)`
  align-self: end;
  justify-self: stretch;
  margin: 0;
  margin-bottom: 5px;
`;

const StyledLayout = styled(Layout)`
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-rows: minmax(400px, auto);
`;

export default class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      persons: [],
      name: "",
      email: "",
      adress: "",
      postal: null,
      country: "",
      city: "",
      search: "",
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.loadPeople();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value,
    });
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

  search = (e) => {
    this.setState({ search: e.target.value });
  };

  renderPeople(person, index) {
    if (!person.Name) {
      return;
    }

    return (
      <tr key={index}>
        <td>{person.Name}</td>
        <td>{person.Email}</td>
        <td>
          {person.City}, {person.Postal}
        </td>
        <td>{person.Country}</td>
        <td>
          <a href={"/program/"}>
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

  createPerson = async () => {
    let person = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.adress,
      city: this.state.city,
      postal: this.state.postal,
      country: this.state.country,
    };

    try {
      await persons.createPerson(person);
      this.loadPeople();
    } catch (e) {
      this.setState({
        error: "Couldn't save!",
      });
    }

    this.setState({ personOption: null, jobOption: null });
  };

  /**
   * Producer list of menu items
   * @type {Array}
   */
  inputFields = [
    ["name", "Navn", "Indtast navn", "text"],
    ["email", "Email", "Indtast email", "email"],
    ["adress", "Adresse", "Indtast adresse", "text"],
    ["city", "By", "Indtast bynavn", "text"],
    ["postal", "Postnummer", "Indtast postnummer", "number"],
    ["country", "Land", "Indtast land", "text"],
  ];

  renderInputFields([id, label, placeholder, type], index) {
    return (
      <FormGrid key={index}>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <TextInput
          id={id}
          type={type}
          value={this.state[id]}
          onChange={this.handleInputChange}
          placeholder={placeholder}
        ></TextInput>
      </FormGrid>
    );
  }

  render() {
    return (
      <StyledLayout>
        <Heading style={{ alignSelf: "end" }} level={1}>
          Personer
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
                  <th>Navn</th>
                  <th>Email</th>
                  <th>By</th>
                  <th>Land</th>
                  <th>Handling</th>
                </tr>
              </thead>
              <tbody>
                {this.state.persons
                  .filter((p) =>
                    p.Name.toLowerCase().includes(
                      this.state.search.toLowerCase()
                    )
                  )
                  .map(this.renderPeople.bind(this))}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </Datatable>
        </Grid>
        <RightGrid>
          {this.inputFields.map(this.renderInputFields.bind(this))}
          <FormGrid>
            <StyledButton primary onClick={this.createPerson}>
              Tilføj person
            </StyledButton>
          </FormGrid>
        </RightGrid>
      </StyledLayout>
    );
  }
}
