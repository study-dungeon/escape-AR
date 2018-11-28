import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';


const Nav = () => {
  return (

  <div className='background'>
      <div className="header-container">

    <div className="header-item">
      <h1 className="game-title">Escape From Study Dungeon</h1>
      <p className="sub-title">An Augmented Reality Experience</p>

      <br />
      <br />
      <br />
    </div>
    </div>

      <div className="button-grid-container">

        <div className="button-grid-item">
          <Link to='/info' ><button className="welcome-btn">Play</button></Link>
        </div>

        <div className="button-grid-item">
          <button className="welcome-btn">Info</button>
        </div>

        <div className="button-grid-item">
          <Link to='/clock'><button className="welcome-btn">Clock</button></Link>
        </div>

        <div className="button-grid-item">
          <Link to='/lock'><button className="welcome-btn">Lock</button></Link>
        </div>

        <div className="button-grid-item">
          <Link to='/envelope'><button className="welcome-btn">Envelope</button></Link>
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


export default Nav;