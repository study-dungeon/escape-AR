import React from 'react';

export default class Clock extends React.Component{



  render(){
    return (
      <h1>{new Date().toLocaleTimeString()}</h1>
    )
  }
}