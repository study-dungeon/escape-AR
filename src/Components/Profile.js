import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../store';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      activeTeamId: 0,
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
    const { username, password, activeTeamId } = this.state;
    const { auth } = this.props;
    this.props.updateUser({ auth, username, password, activeTeamId }) // don't need activeTeamId
      .catch(ex => this.setState({ error: 'Error updating account' }));
  }

  render() {
    const { email, username, password, activeTeamId, error } = this.state;
    const { auth } = this.props;
    return (
      <div id="profile">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={email}
              readOnly
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
          </div>
          <div className="form-group">
            <label>Active Team</label>
            <select value={activeTeamId} name="activeTeamId" onChange={this.handleChange}>
              {
              // auth.teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)
              }
            </select>
          </div>
          <button type="submit">
            Update
          </button>
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
    createTeam: data => dispatch(updateUser(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
