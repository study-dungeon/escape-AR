import React, { Component } from 'react';
import { connect } from 'react-redux';


import { joinTeam } from '../store';

class JoinTeam extends Component {
  constructor() {
    super();
    this.state = {
      team: '',
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
    const { team, password } = this.state;
    const { auth } = this.props;
    this.props.joinTeam({ auth, team, password })
      .catch(ex => this.setState({ error: 'Bad Credentials!' }));
  }

  render() {
    const { team, password, error } = this.state;
    return (
      <div id="joinTeam">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>
            <input
              autoFocus
              name="team"
              value={team}
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
          <button type="submit">
            Join
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
    joinTeam: credentials => dispatch(joinTeam(credentials)),
});

export default connect(mapStateToProps,mapDispatchToProps)(JoinTeam);