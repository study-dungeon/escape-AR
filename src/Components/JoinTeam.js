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
    const { teams } = this.props;

    return (
      <div id="joinTeam">
        <form  className="basic-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>

            <select autoFocus name="team" value={ team.name } onChange={ this.handleChange }>
              <option value="">(select team)</option>

              {
                teams.map(team => <option key={ team.id } value={ team.name }>{ team.name }</option>)
              }

            </select>
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
              <button type="submit" className="welcome-btn">Join</button>
            </div>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, teams }) => {

  return {
    auth,
    teams
  }
  
};

const mapDispatchToProps = dispatch => ({
    joinTeam: credentials => dispatch(joinTeam(credentials)),
});

export default connect(mapStateToProps,mapDispatchToProps)(JoinTeam);
