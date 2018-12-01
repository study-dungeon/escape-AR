import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';

const GamePlay = () => {
  return (
      <div className="how-to-play-container background">
        <Nav />
        <div className="play-instructions">
          <h1>Intro</h1>
          <p>Escape ARoom is a real-time global competition.</p>
          <p>Play as an individual or join a team on the account page.</p>
          <p>
            Each week we will open a new room, full of puzzles that need to be solved.
            Teams from across the world will compete to solve the puzzles as fast as possible and be the first to <b style={{"color": "red"}}>Escape ARoom</b>.
          </p>

          <h1>Setup</h1>
          <div className="button-grid-container">
            <div className="button-grid-item">
              <a href="http://www.espn.com" ><button className="welcome-btn">Download Markers</button></a>
            </div>
          </div>
          <p>
            To turn your living room, office, kitchen, bathroom (!?) into an escape room,
            <b style={{"color": "red"}}>download the ARoom Markers PDF, print out the markers, and set them up in your room. </b>
            We recommend keeping at least 3 ft between markers - and placing the door marker on your door (duh).
            <span>
              <a className="hiro-link" href="/hiro.png"></a>
            </span>
          </p>

          <h1>Gameplay</h1>
          <p>Clicking <b style={{"color": "red"}}>Play</b> opens window to another (augmented) reality.</p>
          <p>Work with your team to explore the clues and solve each puzzle.</p>
          <p>The first team to escape wins the weekly grand prize!</p>
          <br />
          <div className="button-grid-container">
            <div className="button-grid-item">
              <Link to='/room' ><button className="welcome-btn">Play</button></Link>
            </div>
            <div className="button-grid-item">
              <Link to='/' ><button className="welcome-btn">Back</button></Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default GamePlay;
