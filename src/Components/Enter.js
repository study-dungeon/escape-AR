import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';


const Enter = () => {
  return (

  <div>

      <div className="button-grid-container">

        <div className="button-grid-item">
          <Link to='/temp' ><button className="welcome-btn">Play</button></Link>
        </div>

        <div className="button-grid-item">
          <Link to='/info' ><button className="welcome-btn">Info</button></Link>
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