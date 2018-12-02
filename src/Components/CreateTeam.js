import React, { Component } from 'react';
import { connect } from 'react-redux';


import { createTeam } from '../store';

class CreateTeam extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      city: '',
      state: '',
      zip: '',
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
    const { name, password, city, state, zip } = this.state;
    const { auth, history } = this.props;
    this.props.createTeam({ auth, name, password, city, state, zip })
      .then(wasCreated => {
        if(!wasCreated) {
          this.setState({ error: 'Team exists!  Please enter a unique name.' })
        }
        else {
          history.push('/account')
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    const { name, password, city, state, zip, error } = this.state;
    return (
      <div id="createTeam">
        <div className="invalid-feedback">{error}</div>

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
            <label>Password</label>
            <input
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
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
            <label>Zip</label>
            <input
              autoFocus
              name="zip"
              value={zip}
              onChange={this.handleChange}
            />
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

const mapDispatchToProps = (dispatch, { history }) => ({
    createTeam: data => dispatch(createTeam(data, history)),
});

export default connect(mapStateToProps,mapDispatchToProps)(CreateTeam);
