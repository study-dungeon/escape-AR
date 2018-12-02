import React from 'react';

export default class Clock extends React.Component{

  constructor(){
    super()
    this.state = {
      time: new Date().toLocaleTimeString()
    };

    this.checkTime = this.checkTime.bind(this);

    setInterval(this.checkTime, 1000);
  }

  checkTime(){
    this.setState({ time: new Date().toLocaleTimeString() });
  }

  render(){
  
    return (
      <div>
        <br />
        <br />
        <h1 className="time">{this.state.time}</h1>
        <br />
        <br />
      </div>
    )
  }
}