import React, { Fragment, Component } from 'react';

import Header from './Header';
import Nav from './Nav';

class App extends Component {
  

  render() {
    return (
      <div className='background'>
        <Header />
        <Nav />
      </div>
    )
  }

}



export default App;