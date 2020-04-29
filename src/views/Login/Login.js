import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import auth from "../../api/auth";
import Heading from "../../components/heading/Heading";
import TextInput from "../../components/textInput/TextInput";
import Button from "../../components/button/Button";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-template-rows: 2fr 3fr 2fr;
  justify-items: center;
  align-items: center;
  grid-gap: 0.3em;
  grid-auto-rows: minmax(0px, auto);
  background: #f6f5fa;
`;

const Nested = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 2;
  justify-items: center;
  background: white;
  padding: 2em;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: null,
      error: null,
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleLogin() {
    try {
      const token = await auth.login(this.state.email, this.state.password)
      this.setState({ token })
    } catch(err) {
      this.setState({ error: err.toString() })
    }
  }

  render() {
    if (auth.check()) {
      return <Redirect to='/' />
    }

    return (
      <Grid tag="div">
        <Nested>
          <img
            alt="TV2"
            src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='40' viewBox='0 0 90 40' aria-labelledby='tv2logo'%3E%3Ctitle id='tv2logo'%3ETV 2 Logo%3C/title%3E%3Cpath fill='%23d21e1e' d='M89.992 10.172c.3 7.647-8.03 14.59-16.056 14.59h-20.62l5.656-8.324c.44-.663 1.464-1.2 2.274-1.2H75.57c1.847 0 3.85-1.693 3.666-3.555-.155-1.495-1.364-2.144-2.657-2.16H44.55L50.205 1.2C50.66.535 51.668 0 52.478 0h26.26c5.657 0 11.014 4.135 11.254 10.172zm-51.81-1.847L43.84 0H7.93c-.797 0-1.82.536-2.274 1.2L0 9.522h35.91c.81 0 1.82-.535 2.273-1.198zM17.877 40h16.27c.796 0 1.82-.535 2.274-1.2l16-23.562h-10.3c-.797 0-1.82.537-2.275 1.2L25.763 37.164l2.33-21.926h-10.67L15.12 36.966C14.95 38.646 16.17 40 17.876 40zm61.076-1.213l5.655-8.325H50.9c-.795 0-1.818.538-2.272 1.2l-5.657 8.325H76.68c.81.013 1.833-.522 2.274-1.2z'/%3E%3C/svg%3E"
          ></img>
          <Heading style={{ marginTop: 35, marginBlockEnd: 0 }} level={1}>
            Velkommen!
          </Heading>
          {this.state.error && <b style={{ color: 'red' }}>{this.state.error}</b>}
          <TextInput name="email" text="Email" onChange={this.handleChange.bind(this)} />
          <TextInput name="password" text="Kodeord" type="password" onChange={this.handleChange.bind(this)} />
          <Button onClick={this.handleLogin.bind(this)} primary>Login</Button>
        </Nested>
      </Grid>
    );
  }
}
