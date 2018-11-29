import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Nav} />
          <Route exact path="/camera" component={Camera} />
          <Route exact path="/info" component={GamePlay} />
          <Route exact path="/clock" component={Clock} />
          <Route exact path="/lock" component={Lock} />
          <Route exact path="/envelope" component={Envelope} />
          <Route exact path="/letter" component={Letter} />
          <Route exact path="/opening" component={Opening} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
