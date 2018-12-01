import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { joinTeam } from '../store';

class Invite extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      teamId: 0,
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
    console.log("We could send an e-mail...")
  }

  render() {
    const { teamId, email } = this.state;
    const { auth } = this.props;
    return (
      <div id="joinTeam">
        <form onSubmit={this.handleSubmit} className="basic-form">
          <div className="form-group">
            <label>Select Team</label>
            <select value={teamId} name="teamId" onChange={this.handleChange}>
              {
              // auth.teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)
              }
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div className="button-grid-container">
            <div className="button-grid-item">
              <button type="submit" className="welcome-btn">Invite</button>
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

});

export default connect(mapStateToProps,mapDispatchToProps)(Invite);
