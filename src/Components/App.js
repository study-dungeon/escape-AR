import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { exchangeTokenForAuth, getTeams } from '../store';

import Header from './Header';
import Home from './Home';
import GamePlay from './GamePlay';
import Room from './Room';
import Clock from './Clock';
import Lock from './Lock';
import Envelope from './Envelope';
import Letter from './Letter';
import Opening from './Opening';
import Nav from './Nav';
import Temp from './Temp';
import Escaped from './Escaped';
import Enter from './Enter';
import Login from './Login';
import Account from './Account';
import Signup from './Signup';
import New from './Room-New';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { auth } = this.props;
    if (!auth.id) {
      return (
        <Router>
          <div className="background">
            <Switch>
              <Route
                path="/signup"
                render={props => <Signup props={props} />}
              />
              <Route path="/" render={props => <Login props={props} />} />
            </Switch>
          </div>
        </Router>
      );
    }
    return (
      //add account Component, finish Success page
      <Router>
        <Fragment>
          <Route exact path="/" component={Enter} />
          <Route path="/account" component={Account} />
          <Route path="/info" component={GamePlay} />
          <Route path="/signup" render={props => <Signup props={props} />} />
          <Route path="/temp" component={Temp} />
          <Route path="/room" component={Room} />
          <Route exact path="/room/clock" component={Clock} />
          <Route exact path="/room/lock" component={Lock} />
          <Route exact path="/room/envelope" component={Envelope} />
          <Route exact path="/room/letter" component={Letter} />
          <Route exact path="/escaped" component={Escaped} />
          <Route exact path="/opening" component={Opening} />
          <Route exact path="/play" component={New} />
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(exchangeTokenForAuth());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
