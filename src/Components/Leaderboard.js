import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class Leaderboard extends Component {

  render() {
    const { games } = this.props;
    if (games.length) {
      return (
        <div id="leaderboard">
          <div id="leaderboard-container">
            <table id="leaderboard-table">
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
                const timeElapsed = moment(moment(game.endTime).diff(moment(game.startTime)))
                return (
                  <tr key={game.id}>
                    <td>{game.userId}</td>
                    {/* <td>{game.team.city}, {game.team.state}</td> */}
                    <td>Seattle, WA</td>
                    <td>{timeElapsed.minutes()} min {timeElapsed.seconds()} sec</td>
                  </tr>)
                })
              }
              </tbody>
            </table>
          </div>
          <div className="button-grid-container">
            <div className="button-grid-item">
              <Link to='/'><button className="welcome-btn">Home</button></Link>
            </div>
          </div>
        </div>
      )}
      else {
        return (
          <div id="leaderboard">
            <div id="leaderboard-container">
              <div>No successful escapes... yet.</div>
              <div className="button-grid-container">
                <div className="button-grid-item">
                  <Link to='/'><button className="welcome-btn">Home</button></Link>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
}

const mapStateToProps = (state) => ({
  games: state.games,
  activeGame: state.activeGame
})

export default connect(mapStateToProps)(Leaderboard);
