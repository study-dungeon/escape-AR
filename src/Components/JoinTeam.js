import React, { Component } from 'react';
import { connect } from 'react-redux';


import { joinTeam } from '../store';

class JoinTeam extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
    const { name, password } = this.state;
    const { auth } = this.props;
    this.props.joinTeam({ auth, name, password })
      .catch(ex => {
        console.log(ex)
        this.setState({ error: 'Bad Credentials!' })
      })
  }

  render() {
    const { name, password, error } = this.state;

    return (
      <div id="joinTeam">

        {
          error ? <div className="invalid-feedback">{error}</div> : null
        }

        <form  className="basic-form" onSubmit={this.handleSubmit}>
          <div className="form-group">

            <label>Team Name</label>
            <input
              value={name}
              name="name"
              onChange={this.handleChange}
              type="text"
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

const mapStateToProps = ({ auth }) => ({ auth });


const mapDispatchToProps = dispatch => ({
    joinTeam: credentials => dispatch(joinTeam(credentials)),
});

export default connect(mapStateToProps,mapDispatchToProps)(JoinTeam);
