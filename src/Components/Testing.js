import React from 'react';
import { Link } from 'react-router-dom';
import Lock from './Lock';
import Clock from './Clock';
import Letter from './Letter';


export default class Testing extends React.Component {
  constructor(){
    super();
    this.state = {
      showClock: false,
      showLock: false,
      showLetter: false,
      showBand: false,
      showDoor: false
    };

  }
  render(){

    const { showClock, showLock, showLetter, showBang, showDoor } = this.state;

    return (

      <div className="button-grid-container">
        <div className="button-grid-item">
          <button className="welcome-btn" onClick={()=> this.setState({ showClock: true})}>Clock</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showLock: true})}>Lock</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showLetter: true})}>Letter</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showBang: true})}>Bang</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showDoor: true})}>Door</button>

          {showClock && (
            <div>
              <Clock />
              <button onClick={()=> this.setState({ showClock: false }) } >x</button>
            </div>
          )}

          {showLock && (
            <div>
              <Lock />
              <button onClick={()=> this.setState({ showLock: false }) } >x</button>
            </div>
          )}

          {showLetter && (
            <div>
              <Letter />
              <button onClick={()=> this.setState({ showLetter: false }) } >x</button>
            </div>
          )}

          {showLock && (
            <div>
              <Lock />
              <button onClick={()=> this.setState({ showLock: false }) } >x</button>
            </div>
          )}

        </div>
      </div>

    )
  }
}






          /* {clock && (
            <div>
              <button className="welcome-btn" onClick={() => this.setState({ showClock: true })}>
                Check the time
              </button>
              <button className="welcome-btn" onClick={this.setState({ playCreakingSound: true })}>
                {this.state.playCreakingSound && (
                  <Sound
                    url={'creaking.mp3'}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={this.stopPlayingCreakingSound}
                  />
                )}
                Look behind clock
              </button>
            </div>
          )}
          {showClock && <Clock />}
          {letter && (
              <button
                className="welcome-btn"
                onClick={() => this.setState({ hasLetter: true, displayLetter: true })}
              >
                Read me
              </button>
          )}
          {lock && (
            <button
              className="welcome-btn"
              onClick={() => {
                this.setState({ showLock: true })
              }}
            >
              Unlock Me
            </button>
          )}
          {displayLetter && (
            <div>
              <Letter />
              <button onClick={()=> this.setState({ displayLetter: false }) }>
                x
              </button>
            </div>
          )}
          {showLock && (
            <div>
              <Lock receiveKey={this.state.receiveKey}/>
            </div>
          )}
          {door && (
            <div>
              {hasKey ? (
                <Link to="/escaped">
                  <button className="welcome-btn" onClick={this.removeCamera}>
                    Open Door
                  </button>
                </Link>
              ) : (
                <button
                  className="welcome-btn"
                  onClick={() => alert('You need a key')}
                >
                  Open Door
                </button>
              )}

              <button className="welcome-btn" onClick={this.bangDoor}>
              {this.state.playBangingSound && (
                  <Sound
                    url={'banging.mp3'}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={this.stopPlayingBangingSound}
                  />
                )}
                {this.state.playKnockingSound && (
                  <Sound
                    url={'knocking.mp3'}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={this.stopPlayingKnockingSound}
                  />
                )}
                {hasNote ? 'Bang louder' : 'Bang against the door'}
              </button>
            </div>
          )}

          {door && hasLockPick && (
            <button className="welcome-btn" onClick={this.useLockPick}>
              Use Lock Pick
            </button>
          )}
        </div>
        <Stopwatch />
        <Inventory
          hasKey={hasKey}
          hasLetter={hasLetter}
          hasNote={hasNote}
          hasLockPick={hasLockPick}
          hasBrokenLockPick={hasBrokenLockPick}
        />
        <Link to="/testing">Testing</Link>
        <Link to="/escaped">
            <button className="welcome-btn" onClick={this.removeCamera}>
              Open Door
            </button>
        </Link>
      </div> */

