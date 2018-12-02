import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import Leaderboard from './Leaderboard';
import { beatTheGame } from '../store';

class Escaped extends Component {
  componentDidMount() {
    const { activeGame } = this.props
    this.props.beatTheGame( activeGame, moment());
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  activeGame: state.activeGame
})

const mapDispatchToProps = (dispatch) => ({
  beatTheGame: (game, endTime) => dispatch(beatTheGame(game, endTime))
})

export default connect(mapStateToProps, mapDispatchToProps)(Escaped);
