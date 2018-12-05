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
                  <th>Team/User</th>
                  <th>Location</th>
                  <th>Escaped In</th>
                </tr>
              </thead>
              <tbody>
              {
              games.map( game => {
                const endTime = moment(game.endTime);
                const startTime = moment(game.startTime);
                const timeElapsed = moment(endTime.diff(startTime));
                const dummyLocations = ['Seattle, WA', 'San Francisco, CA', 'New York, NY', 'Albany, NY', 'Austin, TX', 'Chicago, IL', 'Brooklyn, NY', 'Orlando, FL', 'Paris, FR', 'Hong Kong, HK'];
                return (
                  <tr key={game.id}>
                    <td>{game.team ? game.team.name : game.user.username}</td>
                    <td>{game.team ? `${game.team.city}, ${game.team.state}` : dummyLocations[Math.floor(Math.random() * 10)]}</td>
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
  games: state.games.sort((gameA, gameB) => gameA.endTime - gameB.endTime),
  activeGame: state.activeGame
})

export default connect(mapStateToProps)(Leaderboard);
