import React from 'react';

function Result(props) {
  const { flag } = props;

  if(flag === 1){
    return (
      <h1>Success!</h1>
    )
  } else if(flag === 2){
    return <h1>Hint: Try looking in the console!</h1>
  } else {
    return null;
  }
}

export default class Lock extends React.Component{

  constructor(){
    super()
    this.state = {
      one: '',
      two: '',
      three: '',
      four: '',
      solution: 1337,
      flag: 0
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if(!num.includes(event.target.value)){
      console.log('please enter a number');
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  onSubmit(event){
    event.preventDefault();

    const { one, two, three, four } = this.state;

    var submission = "" + one + two + three + four;
    submission *= 1;
    console.log("input: ", submission);
    console.log("solution: ", this.state.solution);
    
    if(submission === this.state.solution){
      this.setState({
        flag: 1
      })
    } else {
      this.setState({
        flag: 2
      })
    }
  }


  render(){

    return (
      <div>
        <br />
        <br />
        <h1>Code:</h1>
        <form onSubmit={this.onSubmit} >
        <input type="text" name="one" maxLength="1" onChange={this.onChange}/>
        <br />
        <input type="text" name="two" maxLength="1" onChange={this.onChange}/>
        <br />
        <input type="text" name="three" maxLength="1" onChange={this.onChange}/>
        <br />
        <input type="text" name="four" maxLength="1" onChange={this.onChange}/>
        <br />
        <button>Submit</button>
      </form>
      <br />
      <br />
      <Result flag={this.state.flag} />
      </div>
    )
  }

  
}