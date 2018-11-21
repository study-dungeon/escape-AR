import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Nav from './Nav';
import GamePlay from './GamePlay'


class App extends Component {
  

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={ Nav } />
          <Route path="/info" component={ GamePlay } />
        </Fragment>
      </Router>
    )
  }

}



export default App;
