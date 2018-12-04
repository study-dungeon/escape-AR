import React from 'react';
import { Link } from 'react-router-dom';
import Lock from './Lock';
import Clock from './Clock';
import Letter from './Letter';
import Sound from 'react-sound';
import Escaped from './Escaped';
import Inventory from './Inventory';


export default class Testing extends React.Component {
  constructor(){
    super();
    this.state = {
      key: false,
      letter: false,
      pick: false,
      open: false,
      showClock: false,
      showLock: false,
      showLetter: false,
      showDoor: false,
      knock: false,
      bang: false,
      squeak: false,
      creak: false,
      snap: false,
      flag: false
    };
    this.stopKnock = this.stopKnock.bind(this);
    this.stopBang = this.stopBang.bind(this);
    this.stopSqueak = this.stopSqueak.bind(this);
    this.stopCreak = this.stopCreak.bind(this);
    this.stopSnap = this.stopSnap.bind(this);
    this.receiveKey = this.receiveKey.bind(this);
    this.checkBehind = this.checkBehind.bind(this);
    this.pickLock = this.pickLock.bind(this);
  }

  stopKnock(){ this.setState({ knock: false }) };
  stopBang(){ this.setState({ bang: false }) };
  stopSqueak(){ this.setState({ squeak: false }) };
  stopCreak(){ this.setState({ creak: false }) };
  stopSnap(){ this.setState({ snap: false }) };
  receiveKey(){ this.setState({ key: true }) };
  checkBehind(){ alert('You found an old lockpick'); this.setState({ pick: true, creak: true }); };
  pickLock(){ alert('It broke!'); this.setState({ pick: false, snap: true }); };

  render(){

    const { key, letter, pick, open, showClock, showLock, showLetter, showDoor, knock, bang, squeak, creak, flag, snap } = this.state;

    return (
      <div className="button-grid-container">
        <div className="button-grid-item">

          {/* ----- Buttons ----- */}

          <button className="welcome-btn" onClick={()=> this.setState({ showClock: true })}>Clock</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showLock: true })}>Lock</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showLetter: true, letter: true })}>Letter</button>
          <button className="welcome-btn" onClick={()=> this.setState({ showDoor: true })}>Door</button>

          {/* ----- Components ----- */}

          {showClock && (
            <div>
              <Clock />
              <button className="welcome-btn" onClick={this.checkBehind}>Check Behind Clock</button>
              <button onClick={()=> this.setState({ showClock: false }) } >x</button>
            </div>
          )}

          {showLock && (
            <div>
              <Lock receiveKey={this.receiveKey}/>
              <button onClick={()=> this.setState({ showLock: false }) } >x</button>
            </div>
          )}

          {showLetter && (
            <div>
              <Letter />
              <button onClick={()=> this.setState({ showLetter: false }) } >x</button>
            </div>
          )}

          {showDoor && (
            <div>
              <br />
              { !flag && <button className="welcome-btn" onClick={()=> this.setState({ knock: true, flag: true }) }>Knock</button> }
              { flag && <button className="welcome-btn" onClick={()=> this.setState({ bang: true }) }>Bang</button> }
              { pick && <button className="welcome-btn" onClick={ this.pickLock }>Pick</button> }
              { key && <button className="welcome-btn" onClick={()=> this.setState({ open: true }) }>Open</button> }
              <button onClick={()=> this.setState({ showDoor: false }) } >x</button>
              <br />
            </div>
          )}

          {/* ----- Sounds ----- */}

          { knock && <Sound url={'knocking.mp3'} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stopKnock} /> }
          { bang && <Sound url={'banging.mp3'} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stopBang} /> }
          { squeak && <Sound url={'door.mp3'} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stopSqueak} /> }
          { creak && <Sound url={'creaking.mp3'} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stopCreak} /> }
          { snap && <Sound url={'snapping.mp3'} playStatus={Sound.status.PLAYING} onFinishedPlaying={this.stopSnap} /> }

          {/* ----- Finish ----- */}

          {open && <Escaped /> }


          {/* ----- Inventory ----- */}

          <Inventory hasKey={key} hasLetter={letter} hasLockPick={pick} />

        </div>
      </div>

    )
  }
}
