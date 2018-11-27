import React, { Fragment } from 'react';

import Header from './Header';
import Nav from './Nav';


const Home = () => {

  return (
    <Fragment>

      <div className="background-image">
        <Header />
        <Nav />
        <div className="fog-img fog-img1"></div>
        <div className="fog-img fog-img2"></div>
      </div>

    </Fragment>
  )

}



export default Home;
