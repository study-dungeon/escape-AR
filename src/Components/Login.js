import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../store';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
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
    const { email, password } = this.state;
    this.props.login({ email, password })
      .catch(ex => this.setState({ error: 'Bad Credentials!' }));
  }

  render() {
    const { email, password, error } = this.state;
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn) {
      return history.push("/")
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              autoFocus
              type="email"
              name="email"
              value={email}
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
          <button disabled={!this.validateForm()} type="submit">
            Login
          </button>
          <br />
          <br />
          <Link to="/signup">Sign up.</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }, { props }) => ({
    isLoggedIn: auth.id,
    history: props.history
});

const mapDispatchToProps = dispatch => ({
    login: credentials => dispatch(login(credentials)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
