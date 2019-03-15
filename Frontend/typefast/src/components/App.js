import React from 'react';
import '../styles/App.css';
import StartButton from './StartButton';
import Timer from './Timer';
import CreatePlayer from './Player';
import WordList from './WordList';
import UserList from './UserList';
import UpdateScore from './Score';

class App extends React.Component {
  //Constructor...Starts
  constructor(props) {
    super(props);
    this.state = {
      minutes: '1',
      seconds: '00',
      text: 'Live',
      view: 'Register',
      firstName: '',
      lastName: '',
      userName: '',
      //  scores: 0,
      users: [],
      value: '',
      error: '',
    };

    this.secondsRemaining = 0;
    this.intervalHandle = 0;
    this.inputWords = [];
    this.index = -1;
    this.outputWords = [];
    this.scores = 0;
    this.timerStared = false;
    //this.error = '';
  }
  //Constructor...Ends

  //calculateScore....Starts
  calculateScores() {
    let index = 1;
    while (index < this.outputWords.length) {
      console.log('outputWords ', this.outputWords[index]);
      console.log('inputWords ', this.inputWords[index - 1].word);
      if (this.outputWords[index] === this.inputWords[index - 1].word)
        this.scores++;
      index++;
    }
  }
  //calculateScore....Ends

  //handleChange...Starts
  handleChange = event => {
    //this.state.value = event.target.value
    this.setState({value: event.target.value});
  };
  //handleChange...Ends

  //handleFirstNameChange...Starts
  handleFirstNameChange = event => {
    console.log('firstnamechange');
    //this.state.firstName = event.target.value;
    this.setState({firstName: event.target.value});
    console.log('event.target.value ', event.target.value);
    console.log('First name ', this.state.firstName);
  };
  //handleFirstNameChange...Ends

  //handleLastNameChange...Starts
  handleLastNameChange = event => {
    console.log('lastnamechange');
    //this.state.lastName = event.target.value;
    this.setState({lastName: event.target.value});
    console.log('Last name ', this.state.lastName);
  };
  //handleLastNameChange...Ends

  //handleUserNameChange...Starts
  handleUserNameChange = (event) => {

    //To prevent default rendering behavior
    event.preventDefault();

    console.log('handle user name change');
    console.log('event target user name', this.state.value);
    if (event.target.value) this.state.userName = event.target.value;
    //coming from registration
    else this.state.userName = this.state.value; //coming from returning user
    console.log(" User name ",this.state.userName)
    if (this.state.userName === '') {
      //handles the  case when user  registers with a blank user name
      //this.error = 'Username should not be blank';
        this.setState({
        view: 'Register',
        firstName: '',
        lastName: '',
        users: [],
        error: 'Username should not be blank',
      });

      console.log(" Error ",this.state.error)
      console.log(" User name ",this.state.userName)

      //this.setState({userName: event.target.value});
      console.log('user name ', this.state.userName);
    } else {
      //Check on event.target.value is to avoid going in this
      //if condition if the user is first time user. Registration time
      // event.target.value will have something onChange
      if (!event.target.value) {
        //if the returning user is not present in the database.
        if (this.isUniqueUser()) {
          console.log('user not registered');
          //this.state.error = 'Not a registered user!!';
           this.setState({
             view: 'Register',
             error: 'Not a registered user!!',
             value: ''
           });
        } else {
          //this.error = '';
          this.setState({
            view: 'Loading words...',
            value: '',
            error:''
          });
        }
      }
    }
  };
  //handleUserNameChange...Ends

  //handleWordSubmit...Starts
  handleWordSubmit = event => {
    //call the create player mutation with the given input

    console.log('this state value = ', this.state.value);
    if (this.timerStarted) {
      if (this.index < this.inputWords.length - 1) {
        this.index++;
        console.log('Handle submit if::index = ', this.index);
        this.outputWords.push(this.state.value);
        this.setState({
          text: this.inputWords[this.index].word,
          value: '',
          error: ''
        });
      } else {
        this.calculateScores();
        this.setState({
          view: 'Score Time',
          value: '',
          error: ''
        });
      }

      // to clear the input box every time. This gives warning though
      //this.state.value = '';
      //this.state.error = '';
    } else {
      console.log('timer not started');
      // this.state.error = 'Please start the timer to play';
      this.setState({
        view: 'Game',
        error:'Please start the timer to play'
      });
    }

    event.preventDefault();
  };
  //handleWordSubmit...Ends

  //isUniqueUser...starts
  isUniqueUser = () => {
    let i;
    console.log('isUniqueUser');
    console.log('user = ', this.state.userName);
    for (i = 0; i < this.state.users.length; i++) {
      console.log('for loop ', this.state.users[i]);
      if (this.state.users[i].userName === this.state.userName) {
        return false;
      }
    }
    return true;
  };
  //isUniqueUser...ends

  //handleRegister...Starts
  handleRegister = () => {
    console.log('handleRegister');

    console.log('firstName ', this.state.firstName);
    console.log('lastName ', this.state.lastName);
    console.log('userName ', this.state.userName);

    if (this.state.userName === '') {
      //this.error = 'Username should not be blank!!!!';
      this.setState({
        view: 'Register',
        firstName: '',
        lastName: '',
        users: [],
        error: 'Username should not be blank!!!!',
      });
    } else if (this.isUniqueUser()) {
      console.log('new user');
      //this.error = '';
      this.setState({
        view: 'Loading words...',
        error: '',
      });
    } else {
      //this.error = 'Username already taken!!!!';
      this.setState({
        view: 'Register',
        error: 'Username already taken!!!!',
      });
    }
  };
  //handleRegister...Ends

  //handleWordList...Starts
  handleWordList = words => {
    this.inputWords = words;
    this.setState({view: 'Game'});
  };
  //handleWordList...Ends

  //handleUserList...Starts
  handleUserList = users => {
    console.log('handle user list');
    this.setState({
      users:users,
    })
    //this.state.users = users;
    console.log(this.state.users.length);
  };
  //handleUserList...Ends

  //ticks...Starts
  ticks = () => {
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
      this.setState({view: 'Score Time'});
    }

    this.secondsRemaining--;
  };
  //ticks..Ends

  //startContDown...Starts
  startCountDown = () => {
    console.log('inside countdown');
    this.intervalHandle = setInterval(this.ticks, 1000);
    this.secondsRemaining = 10;
    this.timerStarted = true;
  };
  //startCountDown...Ends

  //render...Starts
  render() {

    console.log("RENDER with state and error msg", this.state.view + this.state.error)

    if (this.state.view === 'Register') {
      return (
        <div className="App">
          <h2>!!!TYPING GAME!!!</h2>
          <UserList onLoadComplete={this.handleUserList} />
          <div>
            <h3>{this.state.error}</h3>
            <h3> New User </h3>
            <CreatePlayer
              handleRegister={this.handleRegister}
              handleFirstName={this.handleFirstNameChange}
              handleLastName={this.handleLastNameChange}
              handleUserName={this.handleUserNameChange}
            />
            <h3> Returning User</h3>
            <form onSubmit={this.handleUserNameChange}>
              <label>
                User Name
                <input
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    }

    if (this.state.view === 'Loading words...') {
      return <WordList onLoadComplete={this.handleWordList} />;
    }
    // if (this.state.view === 'Timer') {
    //   return (
    //     <div className="App">
    //       <div float="left">
    //         <h2>!!!TYPING GAME!!!</h2>
    //         <Timer minutes={this.state.minutes} seconds={this.state.seconds} />
    //         <StartButton startCountDown={this.startCountDown} />
    //       </div>
    //     </div>
    //   );
    // }
    if (this.state.view === 'Game') {
      return (
        <div className="App">
          <div float="left">
            <h2>!!!TYPING GAME!!!</h2>
            <p />
            <Timer minutes={this.state.minutes} seconds={this.state.seconds} />
            <StartButton startCountDown={this.startCountDown} />
          </div>
          <div>{this.state.text}</div>
          <form onSubmit={this.handleWordSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <input style={{marginLeft: 10}} type="submit" value="Submit" />
            <div>
              <h3>{this.state.error}</h3>
            </div>
          </form>

          <div />
        </div>
      );
    }
    if (this.state.view === 'Score Time') {
      return (
        <div>
          <UpdateScore userName={this.state.userName} score={this.scores} />
          <h1>"You scored " {this.scores}</h1>
        </div>
      );
    }
  }
  //render...Ends
}

export default App;
