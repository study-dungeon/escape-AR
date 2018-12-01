import React, { Component } from 'react';
import { connect } from 'react-redux';


import { createTeam } from '../store';

class CreateTeam extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      city: '',
      state: '',
      password: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, city, state, password } = this.state;
    const { auth } = this.props;
    this.props.createTeam({ auth, name, city, state, password })
      .catch(ex => this.setState({ error: 'Team name already exists!' }));
  }

  render() {
    const { name, city, state, password, error } = this.state;
    return (
      <div id="createTeam">
        <form className="basic-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>
            <input
              autoFocus
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              autoFocus
              name="city"
              value={city}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              autoFocus
              name="state"
              value={state}
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
              <button type="submit" className="welcome-btn">Create</button>
            </div>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
    auth
});

const mapDispatchToProps = dispatch => ({
    createTeam: data => dispatch(createTeam(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CreateTeam);
