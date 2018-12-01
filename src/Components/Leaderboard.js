import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { getGames } from '../store';

class Leaderboard extends Component {

  componentDidMount() {
    this.props.getGames();
  }

  render() {
    const { games } = this.props;
    return (
      <div id="leaderboard">
        <div>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Location</th>
                <th>Escaped In</th>
              </tr>
            </thead>
            <tbody>
            {
            games.map( game => {
              const timeElapsed = moment(game.endTime.diff(game.startTime))
              return (
                <tr key={game.id}>
                  <td>{game.team.name}</td>
                  <td>{game.team.city}, {game.team.state}</td>
                  <td>{timeElapsed.minutes()} min {timeElapsed.seconds()} sec</td>
                </tr>)
              })
            }
            </tbody>
          </table>
        </div>
        <Link to='/'><button className="welcome-btn">Home</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  games: state.games
})

const mapDispatchToProps = (dispatch) => ({
  getGames: () => dispatch(getGames())
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
