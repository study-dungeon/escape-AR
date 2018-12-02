import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Sound from 'react-sound';

import Leaderboard from './Leaderboard';

export default class Escaped extends Component {

  constructor(){
    super();
    this.state = {
      play: true
    }
    this.stopPlayingSound = this.stopPlayingSound.bind(this);
  }

  stopPlayingSound(){
    this.setState({
      play: false
    });
  }

  render() {
    const { startTime, endTime } = this.props;
    const timeElapsed = moment(endTime.diff(startTime));
    return (
      <div>
        <div id="escaped-container">
          <h2>Congratulations!</h2>
          <h3>You escaped in <br /> {timeElapsed.minutes()} min and {timeElapsed.seconds()} sec.</h3>
          <div>Your time ranks:
            <br/>
            <b style={{"color": "red"}}>3rd</b> out of 29
            <br />
            escapes this week!</div>
          <br />
          <Leaderboard />
          <br />
          <br />
          <br />
          {this.state.play && (
            <Sound
              url={'door.mp3'}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={this.stopPlayingSound}
            />
          )}
        </div>
      </div>
    )
  }
}