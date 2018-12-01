import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Leaderboard from './Leaderboard';

export default class Escaped extends Component {
  render() {
    const { startTime, endTime } = this.props;
    const timeElapsed = moment(endTime.diff(startTime));
    return (
      <div>
        <div>
          <h2>Congratulations!</h2>
          <h3>You escaped in {timeElapsed.minutes()} min and {timeElapsed.seconds()} sec.</h3>
          <div>Your time ranks 3rd out of 29 escapes this week!</div>
          <br />
          <Leaderboard />
          <br />
          <br />
          <br />
          </div>
      </div>
    )
  }
}