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
import Temp from './Temp';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={ Nav } />
          <Route path="/temp" component={ Temp } />
          <Route path="/camera" component={Camera} />
          <Route path="/info" component={ GamePlay } />
          <Route path="/clock" component={ Clock } />
          <Route path="/lock" component={ Lock } />
          <Route path="/envelope" component={ Envelope } />
          <Route path="/letter" component={ Letter } />
          <Route path='/opening' component={ Opening } />
        </Fragment>
      </Router>
    );
  }
}

export default App;
