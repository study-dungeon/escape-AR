import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';

import Nav from './Nav';


export default class Enter extends React.Component {

  constructor(){
    super();
    this.state = {
      rain: true
    };
    this.stopRain = this.stopRain.bind(this);
    this.startRain = this.startRain.bind(this);
  }

  stopRain(){ this.setState({ rain: false }) };
  startRain() { this.setState({ rain: true }) };

  render(){
    return (
      <div>
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

            <div className="button-grid-item">
              <Link to='/play'><button className="welcome-btn">Testing</button></Link>
            </div>

            {this.state.rain && (
              <div className="button-grid-item">
                <button className="welcome-btn" onClick={this.stopRain}>Mute</button>
              </div>
            )}

            { this.state.rain && <Sound url={'rain.mp3'} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stopRain} /> }
            { !this.state.rain && (
              <div className="button-grid-item">
                <button className="welcome-btn" onClick={this.startRain}>Unmute</button>
              </div>
            )}

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
}