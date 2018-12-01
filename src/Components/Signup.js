import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import { signup } from '../store';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    const rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rgx.test(this.state.email) && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, username, password } = this.state;
    this.props.createTeam({ email, username, password })
      .catch(ex => this.setState({ error: 'Team name already exists!' }));
  }

  render() {
    const { email, username, password, error } = this.state;
    return (
      <div id="signup" className="background">
        <Nav />
        <div id="signup">
          <form onSubmit={this.handleSubmit} className="basic-form">
            <div className="form-group">
            <label>E-mail</label>
              <input
                autoFocus
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                name="password"
                onChange={this.handleChange}
                type="password"
              />
              <div className="invalid-feedback">{error}</div>
            </div>
            <button disabled={!this.validateForm()} type="submit" className="welcome-btn">
              Sign Up
            </button>
            <br />
          <Link to="/">Return to Login</Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    signup: data => dispatch(signup(data)),
});

export default connect(null, mapDispatchToProps)(Signup);
