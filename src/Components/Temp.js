import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Escaped from './Escaped';

export default class Temp extends Component {
  constructor() {
    super();
    this.state = {
      startTime: moment(),
      // marker_[item] field determine if call-to-action buttons show
      marker_lock: false,
      marker_letter: false,
      marker_clock: false,
      marker_door: false,
      hasKey: false,
      codeAnswer: '1234'
    };
    this.lockClick = this.lockClick.bind(this);
    this.clockClick = this.clockClick.bind(this);
    this.letterClick = this.letterClick.bind(this);
    this.doorClick = this.doorClick.bind(this);
  }

  lockClick() {
    if (!this.state.marker_lock) {

      console.log('lock found');
      this.setState({ marker_lock: true });
      // markerRoot.add(sphere);

      setTimeout(() => {
        console.log('lock removed');
        this.setState({ marker_lock: false });
        // markerRoot.remove(sphere);
      }, 3000);
    }
  }

  clockClick() {
    if (!this.state.marker_clock) {

      console.log('clock found');
      this.setState({ marker_clock: true });
      // markerRoot.add(sphere);

      setTimeout(() => {
        console.log('clock removed');
        // markerRoot.remove(sphere);
        this.setState({ marker_clock: false });
      }, 3000);
    }
  }

  letterClick() {
    if (!this.state.marker_letter) {

      console.log('letter found');
      this.setState({ marker_letter: true });
      // markerRoot.add(sphere);

      setTimeout(() => {
        console.log('letter removed');
        // markerRoot.remove(sphere);
        this.setState({ marker_letter: false });
      }, 3000);
    }
  }

  doorClick() {
    if (!this.state.marker_door) {

      console.log('door found');
      this.setState({ marker_door: true });
      // markerRoot.add(sphere);

      if (!this.state.hasKey) {
        setTimeout(() => {
          console.log('door removed');
          // markerRoot.remove(sphere);
          this.setState({
            marker_door: false,
            hasKey: true // NEED TO REMOVE AFTER TESTING
          });
        }, 3000);
      }
    }
  }

  render() {
    const { marker_letter, marker_clock, marker_door, marker_lock, hasKey, startTime } = this.state;

    return(
      <div className="button-grid-container">

        <div className="button-grid-item">
          <button className="welcome-btn" onClick={this.clockClick}>Clock</button>
        </div>

        <div className="button-grid-item">
          <button className="welcome-btn" onClick={this.lockClick}>Lock</button>
        </div>

        <div className="button-grid-item">
          <button className="welcome-btn" onClick={this.letterClick}>Letter</button>
        </div>

        <div className="button-grid-item">
          <button className="welcome-btn" onClick={this.doorClick}>Door</button>
        </div>

        <div>Button below will appear on appropriate markerFound</div>

        <div className="button-grid-item">
          {marker_clock && <Link to='/room/clock'><button className="welcome-btn">Check the time</button></Link>}
          {marker_letter && <Link to='/room/letter'><button className="welcome-btn">Read me</button></Link>}
          {marker_lock && <Link to='/room/lock'><button className="welcome-btn">Unlock me</button></Link>}
          {marker_door &&  (hasKey ? <Escaped startTime={startTime} endTime={moment()} /> : <div style={{"color": "white"}}>You need a key!</div>)}
        </div>

      </div>
    )
  }
}