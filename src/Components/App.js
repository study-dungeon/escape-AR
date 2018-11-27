import React, { Fragment, Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import GamePlay from './GamePlay';


class App extends Component {
  
  render() {
    return (
      <Router>
        <Fragment>
          <Home />
          <Route path="/info" component={ GamePlay } />
        </Fragment>
      </Router>
    )
  }

}



export default App;
