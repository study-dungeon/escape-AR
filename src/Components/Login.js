import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import { login, guestSignIn } from '../store';

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
      <div id="login" className="background">
        <Nav />
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
            <label>Password</label>
            <input
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            <div className="invalid-feedback">{error}</div>
          </div>
          <div className="button-grid-container">
            <div className="button-grid-item">
              <button disabled={!this.validateForm()} type="submit" className="welcome-btn">Login</button>
            </div>
            <div className="button-grid-item">
              <button onClick={this.props.guestSignIn} className="welcome-btn">Play as Guest</button>
            </div>
          </div>
          <br />
          <br />
          <Link to="/signup">New player?</Link>
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
    guestSignIn: () => dispatch(guestSignIn())
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
