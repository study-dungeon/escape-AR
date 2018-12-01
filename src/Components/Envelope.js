import React from 'react';
import { Link } from 'react-router-dom';

function Letter(props){
  const { flag } = props;

  if(flag === 1){
    return (
      <div>
        <br />
        <br />
        <img src='http://i65.tinypic.com/34gvzet.jpg' />
      </div>
    )
  } else {
    return null;
  }
}

export default class Envelope extends React.Component{

  constructor(){
    super();
    this.state = {
      flag: 0
    }
    this.openLetter = this.openLetter.bind(this);
  }

  openLetter(){
    this.setState({
      flag: 1
    })
  }

  render(){
    return (
      <div>
        {/* <Link to='/letter'><button>Open Letter</button></Link> */}
        <Letter flag={this.state.flag} />
        <button onClick={this.openLetter}>Open Letter</button>
      </div>
    )}
}