import React from 'react';
import '../styles/App.css';
import StartButton from './StartButton';
import Timer from './Timer';
import PlayerList from './PlayerList';
import WordList from './WordList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '1',
      seconds: '00',
      text: 'Welcome',
    };

    this.secondsRemaining = 0;
    this.intervalHandle = 0;
    this.inputString = ['a', 'b', 'c'];
    this.index = 0;
  }

  handleChange = event => {
    this.setState({value: event.target.value});
  };

  handleSubmit = event => {
    //alert('Submitted text ' + this.state.value)

    if (this.index !== this.inputString.length) {
      this.setState({
        text: this.inputString[this.index],
      });
      this.index++;
    }
    event.preventDefault();
  };

  ticks = () => {
    //console.log("inside ticks")
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining;

    this.setState({
      minutes: min,
      seconds: sec,
    });

    if (min < 10) {
      this.setState({minutes: '0' + min});
    }

    if (sec < 10) {
      this.setState({seconds: '0' + sec});
    }

    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
    }

    this.secondsRemaining--;
  };

  startCountDown = () => {
    console.log('inside countdown');
    this.intervalHandle = setInterval(this.ticks, 1000);
    //let time  = this.state.minutes;
    this.secondsRemaining = 10;
  };

  render() {
    return (
      <body>
        <div class="App">
          <div float="left">
            <Timer minutes={this.state.minutes} seconds={this.state.seconds} />
            <StartButton startCountDown={this.startCountDown} />
          </div>
          <h2>!!!TYPING GAME!!!</h2>
          <div
            float="right"
            style={{
              fontColor: 'orange',
              fontSize: 40,
              marginBottom: 100,
              marginTop: 100,
            }}>
            {this.state.text}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input style={{marginLeft: 10}} type="submit" value="Submit" />
          </form>

          <form onSubmit={this.handleRegister}>
            <p />
            <div>
              First Name{' '}
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Last Name{' '}
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <div>
              User Name{' '}
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <input style={{marginLeft: 10}} type="submit" value="Register" />
          </form>

          <div>
            <WordList />
          </div>
        </div>
      </body>
    );
  }
}

export default App;