import React, { Component } from 'react';
import moment from 'moment';

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment(),
      current: moment(),
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 50);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  tick() {
    this.setState({ current: moment() });
  }

  render() {
    const { current, startTime } = this.state;
    const timeElapsed = moment(current.diff(startTime));
    const dynamicClass = timeElapsed.minutes() > 1 ? 'timeRed' : 'timeGreen';
    return (
      <div className="stopwatch">
        <h5> </h5>
        <h5 className={dynamicClass}>
          {timeElapsed.format('mm[mins] ss.SSS[s]')}
        </h5>
      </div>
    );
  }
}
