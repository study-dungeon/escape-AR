import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Escaped extends Component {
  render() {
    const { startTime, endTime } = this.props;
    const timeElapsed = moment(endTime.diff(startTime));
    return (
      <div>
        <div style={{"color": "white"}}>
          Congratulations!
          <br />
          You escaped in {timeElapsed.minutes()} min and {timeElapsed.seconds()} sec.
          <br />
          Your time ranks 3rd out of 29 escapes this week!
          <br />
          Fastest times this week:
          <br />
          <br />
          <br />
          </div>
          <Link to='/'><button className="welcome-btn">Home</button></Link>
      </div>
    )
  }
}