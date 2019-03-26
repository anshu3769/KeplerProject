import React from 'react';
import '../styles/App.css';
import StartButton from './StartButton';
import Timer from './Timer';
import CreatePlayer from './Player';
import WordList from './WordList';
import TopScores from './TopScore';
import UserList from './UserList';
import UpdateScore from './Score';

/*
 * The page has four views
 * 1. "Register" view where the user registers/login
 * 2. "Loading" view where the words get loaded after the user logs in
 * 3. "Game" view where the player plays the game.
 * 4. "Score" view where the score for the current game are displayed
 */

class App extends React.Component {
  ///////Constructor..starts
  constructor(props) {
    super(props);
    this.state = {
      minutes: '1',
      seconds: '00',
      text: 'Welcome',
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
    this.indicesUsedInThisGame = [];
    this.scores = 0;
    this.timerStared = false;
  }
  //Constructor...Ends

  //calculateScore....Starts
  calculateScores() {
    console.log('Inside calculate scores');
    console.log(
      'this.indicesUsedInThisGame.length ',
      this.indicesUsedInThisGame.length,
    );
    let index = 1;
    let i;
    for (i = 0; i < this.indicesUsedInThisGame.length; i++) {
      console.log('outputWords ', this.outputWords[index]);
      console.log(
        'inputWords ',
        this.inputWords[this.indicesUsedInThisGame[i]].word,
      );
      if (
        this.outputWords[index] ===
        this.inputWords[this.indicesUsedInThisGame[i]].word
      )
        this.scores += 10;
      index++;
    }
    //clear the indices list for next game
    this.indicesUsedInThisGame = [];
  }
  //calculateScore....Ends

  //handleScoreUpdate..starts
  handleScoreUpdate = event => {
    alert('Your scores have been updated');
    //this.setState({view: 'Score Updated'});
  };
  //handleScoreUpdate..Ends

  //handleChange...Starts
  handleChange = event => {
    this.setState({value: event.target.value});
  };
  //handleChange...Ends

  //handleNewGame..starts
  handleNewGame = event => {
    this.setState({
      view: 'Game',
      seconds: '00',
      minutes: '1',
    });
  };
  //handleNewGame..ends

  //handleLogout..starts
  handleLogout = event => {
    this.setState({view: 'Register'});
  };

  //handleFirstNameChange...Starts
  handleFirstNameChange = event => {
    this.setState({firstName: event.target.value});
  };
  //handleFirstNameChange...Ends

  //handleLastNameChange...Starts
  handleLastNameChange = event => {
    this.setState({lastName: event.target.value});
  };
  //handleLastNameChange...Ends

  //handleUserNameChange...Starts
  handleUserNameChange = event => {
    //To prevent default rendering behavior
    event.preventDefault();

    console.log('handle user name change');
    console.log('event target user name', this.state.value);
    if (event.target.value) this.state.userName = event.target.value;
    //coming from registration
    else this.state.userName = this.state.value; //coming from returning user
    console.log(' User name ', this.state.userName);
    if (this.state.userName === '') {
      //handles the  case when user  registers with a blank user name
      this.setState({
        view: 'Register',
        firstName: '',
        lastName: '',
        users: [],
        error: 'Username should not be blank!!',
      });
    } else {
      //Check on event.target.value is to avoid going in this
      //if condition if the user is first time user. Registration time
      // event.target.value will have something onChange
      if (!event.target.value) {
        //if the returning user is not present in the database.
        if (this.isUniqueUser()) {
          this.setState({
            view: 'Register',
            error: 'Not a registered user!!',
            value: '',
          });
        } else {
          this.setState({
            view: 'Loading',
            value: '',
            error: '',
          });
        }
      }
    }
  };
  //handleUserNameChange...Ends

  //handleWordSubmit...Starts
  handleWordSubmit = event => {
    //choose a word randomly from the input word list
    let randomIndex = Math.floor(Math.random() * Math.floor(100));
    if (this.timerStarted) {
      if (this.index < this.inputWords.length - 1) {
        this.index++;
        console.log('Handle submit if::index = ', this.index);
        this.outputWords.push(this.state.value);
        this.setState({
          text: this.inputWords[randomIndex].word,
          value: '',
          error: '',
        });
        this.indicesUsedInThisGame.push(randomIndex);
      } else {
        this.calculateScores();
        this.setState({
          view: 'Score',
          value: '',
          error: '',
        });
      }
    } else {
      this.setState({
        view: 'Game',
        error: 'Please start the timer to play!!',
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
      this.setState({
        view: 'Register',
        firstName: '',
        lastName: '',
        users: [],
        error: 'Username should not be blank!!!!',
      });
    } else if (this.isUniqueUser()) {
      console.log('new user');
      this.setState({
        view: 'Loading',
        error: '',
        users: this.state.users.push(this.state.userName),
      });
    } else {
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

    //Trying to uncomment this run the loop forever  in the Query component
    // this.setState({
    //   users:users,
    // })
    this.state.users = users;
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

      this.calculateScores();

      this.setState({
        view: 'Score',
        value: '',
        error: '',
      });
    }

    this.secondsRemaining--;
  };
  //ticks..Ends

  //startContDown...Starts
  startCountDown = () => {
    console.log('inside countdown');
    this.intervalHandle = setInterval(this.ticks, 1000);
    this.secondsRemaining = 60;
    this.timerStarted = true;
  };
  //startCountDown...Ends

  //render...Starts
  render() {
    //Register view
    if (this.state.view === 'Register') {
      return (
        <div className="App">
          <h2 className= "blink">!!!TYPING GAME!!!</h2>
          <UserList onLoadComplete={this.handleUserList} />
          <div className="Main-div">
            <div className="score">
              <h3 className="Heading">Leaderboard</h3>
              <TopScores />
            </div>
            <div className="Register">
              <h3>{this.state.error}</h3>
              <h3 className="Heading"> New Player </h3>
              <CreatePlayer
                handleRegister={this.handleRegister}
                handleFirstName={this.handleFirstNameChange}
                handleLastName={this.handleLastNameChange}
                handleUserName={this.handleUserNameChange}
              />
              <h3 className="Heading"> Returning Player</h3>
              <form onSubmit={this.handleUserNameChange}>
                <label>
                  User Name
                  <input
                    style={{marginLeft: 10}}
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Login" />
              </form>
            </div>
          </div>
        </div>
      );
    }

    //Words Loading view
    if (this.state.view === 'Loading') {
      return <WordList onLoadComplete={this.handleWordList} />;
    }

    //Game view
    if (this.state.view === 'Game') {
      return (
        <div className="App">
          <div float="left">
            <h3 className="Heading">
              {' '}
              Hello {this.state.firstName} {this.state.lastName}
            </h3>
            <h2 className="blink">!!!TYPING GAME!!!</h2>
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
            <div>
              <h3>{this.state.error}</h3>
            </div>
          </form>

          <div />
        </div>
      );
    }
    //Score view
    if (this.state.view === 'Score') {
      return (
        <div className="App">
          <h1 className="Heading">
            You scored {this.scores} in this game.{' '}
          </h1>
          <h2 ClassName="Heading">Hit update if you want to submit the scores</h2>
          <UpdateScore
            userName={this.state.userName}
            score={this.scores}
            handleScoreUpdate={this.handleScoreUpdate}
          />
          <button
            className="Button"
            type="submit"
            onClick={this.handleNewGame}>
            New Game
          </button>
          <button
            className="Button"
            type="submit"
            onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      );
    }
  }
  //render...Ends
}

export default App;
