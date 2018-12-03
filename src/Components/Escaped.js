import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Sound from 'react-sound';

import Leaderboard from './Leaderboard';
import { beatTheGame } from '../store';

class Escaped extends Component {
  constructor(){
    super();
    this.state = {
      play: true
    }
    this.stopPlayingSound = this.stopPlayingSound.bind(this);
  }
  
  componentDidMount() {
    const { activeGame } = this.props
    this.props.beatTheGame( activeGame, moment());
  }

  stopPlayingSound(){
    this.setState({
      play: false
    });
  }

  render() {
    const { activeGame, games } = this.props;
    const { startTime } = activeGame;
    const endTime = activeGame.endTime ? moment(activeGame.endTime) : this.props.endTime;
    const timeElapsed = moment(endTime.diff(moment(startTime)));
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
          <Leaderboard games={games}/>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  activeGame: state.activeGame,
  games: state.games,
  endTime: moment()
})

const mapDispatchToProps = (dispatch) => ({
  beatTheGame: (game, endTime) => dispatch(beatTheGame(game, endTime))
})

export default connect(mapStateToProps, mapDispatchToProps)(Escaped);
