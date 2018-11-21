import React, { Fragment } from 'react';



const Nav = () => {
  return (
    <Fragment>
      <div className="button-grid-container">

      <div className="button-grid-item">
        <button className="welcome-btn">Play</button>
      </div>

      <div className="button-grid-item">
        <button className="welcome-btn">Info</button>
      </div>
      </div>
    </Fragment>
  )
}


export default Nav;
