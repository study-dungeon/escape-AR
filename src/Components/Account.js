import React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';
import Invite from './Invite';
import Profile from './Profile';


const Account = () => {
  return (
    <div className="background">

      <Nav />

      <div id="accountContainer">
        <div className="button-grid-container">
          <div className="button-grid-item">
            <Link to='/account/jointeam' ><button className="welcome-btn">Join Team</button></Link>
          </div>
          <div className="button-grid-item">
            <Link to='/account/createteam' ><button className="welcome-btn">Create Team</button></Link>
          </div>
          <div className="button-grid-item">
            <Link to='/account/invite' ><button className="welcome-btn">Invite Player</button></Link>
          </div>
          <div className="button-grid-item">
            <Link to='/account/profile'><button className="welcome-btn">Edit Profile</button></Link>
          </div>
          <div className="button-grid-item">
            <Link to='/' ><button className="welcome-btn">Back</button></Link>
          </div>
        </div>

        <div id="accountTools">
          <Router>
            <Switch>
              <Route path="/account/jointeam" component={ JoinTeam } />
              <Route path="/account/createteam" component={ CreateTeam } />
              <Route path="/account/invite" component={ Invite } />
              <Route path="/account/profile" component={ Profile } />
            </Switch>
          </Router>
        </div>

      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Account);