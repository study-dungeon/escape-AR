import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import GamePlay from './GamePlay';
import Camera from './Camera';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Nav} />
          <Route path="/info" component={GamePlay} />
          <Route exact path="/camera" component={Camera} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
