import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';
import GamePlay from './GamePlay';

import Camera from './Camera';
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

class App extends Component {
  render() {
    const { auth } = this.props
    if (!auth.id) {
      return (
        <Router>
          <div className='background'>
            <Nav />
            <Route path="/" render={ (props) => <Login props={props} /> } />
          </div>
        </Router>
      )
    }
    return ( //add account Component, finish Success page
      <Router>
        <Fragment>
          <Route exact path="/" component={ Enter } />
          <Route path="/account" component={ Account } />
          <Route path="/info" component={ GamePlay } />
          <Route path="/temp" component={ Temp } />
          <Route path="/room" component={ Camera } />
          <Route exact path="/room/clock" component={ Clock } />
          <Route exact path="/room/lock" component={ Lock } />
          <Route exact path="/room/envelope" component={ Envelope } />
          <Route exact path="/room/letter" component={ Letter } />
          <Route exact path="/escaped" component={ Escaped } />
          <Route exact path="/opening" component={ Opening } />
        </Fragment>
      </Router>
    );
  }
}

const MapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(MapStateToProps)(App);
