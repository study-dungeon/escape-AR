import React from 'react';
import Sound from 'react-sound';

export default class Clock extends React.Component{

  constructor(){
    super()
    this.state = {
      time: new Date().toLocaleTimeString(),
      play: true
    };

    this.checkTime = this.checkTime.bind(this);
    this.stopPlayingSound = this.stopPlayingSound.bind(this);

    setInterval(this.checkTime, 1000);
  }

  checkTime(){
    this.setState({ time: new Date().toLocaleTimeString() });
  }

  stopPlayingSound(){
    console.log('stop the sound');
    this.setState({ play: false });
  }

  render(){
  
    return (
      <div>
        <br />
        <br />
        <h1 className="time">{this.state.time}</h1>
        <br />
        <br />
        {this.state.play && (
          <Sound
            url={'clock.mp3'}
            playStatus={Sound.status.PLAYING}
            onFinishedPlaying={this.stopPlayingSound}
          />
        )}
      </div>
    )
  }
}