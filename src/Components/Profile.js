import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../store';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      teamId: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const { username, email, password, teamId } = this.props.auth;

    this.setState({ username, email, password, teamId })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, email, password, teamId } = this.state;
    const { auth } = this.props;
    this.props.updateUser(auth.id, { username, email, password, teamId })
      .catch(ex => this.setState({ error: 'Error updating account' }));
  }

  render() {
    const { username, email, password, teamId, error } = this.state;
    const { auth } = this.props;
    return (
      <div id="profile">
        <form onSubmit={this.handleSubmit} className="basic-form">

          {error ? <div className="invalid-feedback">{error}</div> : <br />}

          <div className="form-group">
            <label>Username</label>
            <input
              required
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              required
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              required
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
   
            />
          </div>
          <div className="form-group">
            <label>Active Team</label>
            <select value={teamId} name="teamId" onChange={this.handleChange}>
              {
              // auth.teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)
              }
            </select>
          </div>
          <br />
          <div className="button-grid-container">
            <div className="button-grid-item">
              <button type="submit" className="welcome-btn">Save</button>
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

const mapDispatchToProps = (dispatch, { history }) => ({
    updateUser: (id, user) => dispatch(updateUser(id, user, history)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
