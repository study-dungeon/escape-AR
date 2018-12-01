import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ auth }) => {
  return (
    <div className="header-container">
      <div className="header-item">
        <h1 className="game-title">Escape From ARoom</h1>
        <p className="sub-title">An Augmented Reality Experience</p>

        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Nav);
