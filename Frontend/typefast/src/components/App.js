import React from 'react';
import '../styles/App.css';
import StartButton from './StartButton'
import Timer from './Timer';
import PlayerList from './PlayerList';
import WordList from './WordList';
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_PLAYER = gql`
  mutation CreatePlayer($firstName:String!,$lastName:String!,$userName:String!){
    createPlayer(firstName:$firstName,lastName:$lastName,userName:$userName){
    player{
      firstName,
      lastName,
      userName
    }
  }
  }
`;

const CreatePlayer = () => {
  let firstName;
  let lastName;
  let userName;

  return (
    <Mutation mutation={CREATE_PLAYER}>
      {(createPlayer, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              createPlayer({ variables: { firstName: firstName.value , lastName: lastName.value, userName:userName.value} });
              firstName.value = "";
              lastName.value = "";
              userName.value = "";
            }}
          >
          <div>
            <input
              ref={node => {
                firstName = node;
              }}
            />
          </div>

          <div>
            <input
              ref={node => {
                lastName = node;
              }}
            />
          </div>
          <div>
            <input
              ref={node => {
                userName = node;
              }}
            />
          </div>
            <button type="submit">Register Player</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

class App extends React.Component {

//Constructor...Starts
  constructor(props){
    super(props);
    this.state = {
      minutes: '1',
      seconds: '00',
      text: 'Welcome',
      view: 'Register',
      firstName: '' ,
      lastName: '',
      userName: ''

    }

    this.secondsRemaining = 0;
    this.intervalHandle = 0;
    this.inputString = ["a","b","c"];
    this.index = 0;

  }
//Constructor...Ends


//handleChange...Starts
  handleChange = (event) => {

      this.setState({value: event.target.value})
  }
//handleChange...Ends


//handleFirstNameChange...Starts
  handleFirstNameChange = (event) => {

      this.setState({firstName: event.target.value})
  }
//handleFirstNameChange...Ends


//handleLastNameChange...Starts
  handleLastNameChange = (event) => {

      this.setState({lastName: event.target.value})
  }
//handleLastNameChange...Ends

//handleUserNameChange...Starts
  handleUserNameChange = (event) => {

      this.setState({userName: event.target.value})
  }
//handleUserNameChange...Ends


//handleSubmit...Starts
  handleSubmit = (event) => {

   //call the create player mutation with the given input


      if(this.index !== this.inputString.length)
      {
        this.setState({
          text: this.inputString[this.index]
        })
        this.index++
      }
     event.preventDefault()
  }
//handleSubmit...Ends


//handleRegister...Starts
  handleRegister = (event) => {

    this.setState(
        {view:'Game',
        })
  }
//handleRegister...Ends


//ticks...Starts
  ticks = () => {

    var min = Math.floor(this.secondsRemaining/60)
    var sec = this.secondsRemaining

    this.setState({
      minutes: min,
      seconds: sec
    })

    if(min < 10){

      this.setState(
        {minutes: "0" + min,
        })
    }

    if(sec < 10){
      this.setState(
        {seconds: "0" + sec,
        })
    }

    if(min === 0 & sec === 0){
     clearInterval(this.intervalHandle);
    }

    this.secondsRemaining--

  }
//ticks..Ends



//startContDown...Starts
  startCountDown = () =>{
 console.log("inside countdown")
    this.intervalHandle = setInterval(this.ticks,1000);
    this.secondsRemaining = 10;

  }
//startCountDown...Ends


//render...Starts
  render() {

    if(this.state.view === 'Register'){
    return (
      <body>
        <div class="App">
          <h2>!!!TYPING GAME!!!</h2>
          <CreatePlayer/>
          <form onSubmit={this.handleRegister}>
            <p>


            </p>
            <div>
              First Name <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
            </div>
            <div>
             Last Name  <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange}/>
            </div>
            <div>
              User Name <input type="text" value={this.state.userName} onChange={this.handleUserNameChange}/>
            </div>
            <input  style={{marginLeft:10}} type="submit" value="Register"/>
          </form>

       </div>
      </body>
    );
  }

  else {
  return (
      <body>
        <div class="App">
          <div float="left">
            <Timer minutes={this.state.minutes} seconds={this.state.seconds}/>
            <StartButton startCountDown={this.startCountDown}/>
          </div>
          <h2>!!!TYPING GAME!!!</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <input  style={{marginLeft:10}} type="submit" value="Submit"/>
          </form>

          <div>
           <WordList/>
         </div>
       </div>
      </body>
    );
 }
 }
//render...Ends

}

export default App;
