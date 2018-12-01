import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';

import Nav from './Nav';


const Enter = () => {
  return (

  <div className="background">

      <Nav />

      <div className="button-grid-container">

        <div className="button-grid-item">
          <Link to='/room' ><button className="welcome-btn">Play</button></Link>
        </div>

        <div className="button-grid-item">
          <Link to='/info' ><button className="welcome-btn">Instructions</button></Link>
        </div>

        <div className="button-grid-item">
          <Link to='/account' ><button className="welcome-btn">Account</button></Link>
        </div>

        <div className="button-grid-item">
          <Link to='/opening'><button className="welcome-btn">Opening</button></Link>
        </div>

      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
  </div>

    
  )
}


export default Enter;