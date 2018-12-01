import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Nav} />
          <Route path="/temp" component={Temp} />
          <Route path="/room" component={Room} />
          <Route exact path="/info" component={GamePlay} />
          <Route exact path="/opening" component={Opening} />
          <Route exact path="/room/clock" component={Clock} />
          <Route exact path="/room/lock" component={Lock} />
          <Route exact path="/room/letter" component={Letter} />
          <Route exact path="/room/escaped" component={Escaped} />
          <Route exact path="/envelope" component={Envelope} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
