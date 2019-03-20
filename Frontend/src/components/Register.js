import React from 'react';

class RegisterPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      //value:''
    };
  }

  componentDidMount() {
    for (let x in this.refs) {
      this.refs[x].onkeypress = e => this.handleKeyPress(e, this.refs[x]);
    }
    this.refs.name.focus();
  }

  handleKeyPress = (e, field) => {
    // If enter key is pressed, focus next input field.
    if (e.keyCode === 13) {
      e.preventDefault();
      let next = this.refs[field.name].nextSibling;
      if (next && next.tagName === 'INPUT') {
        this.refs[field.name].nextSibling.focus();
      }
    }
  };

  handleButtonClick = e => {
    e.preventDefault();
    this.setState({value: ''});
    //console.log('buttonClicked!');
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            ref="name"
            value={this.state.value}
            onChange={this.props.handleFirstName}
          />
          <input
            type="text"
            name="lastname"
            ref="lastname"
            value={this.state.value}
            onChange={this.props.handleLastName}
          />
          <input
            type="text"
            name="username"
            ref="username"
            value={this.state.value}
            onChange={this.props.handleUserName}
          />
          <button onClick={this.handleButtonClick}>Submit</button>
        </form>
      </div>
    );
  }
}

//class RegisterPlayer extends React.Component {
//  constructor() {
//    super();
//  }

//  // Loop through the ref's object, and bind each of them to onkeypress
//  componentDidMount() {
//    console.log("this.refs ",this.refs)
//    for (let x in this.refs) {
//      this.refs[x].onkeypress = e => this.handleKeyPress(e, this.refs[x]);
//    }
//    this.refs.name.focus();
//  }

//  // This checks ENTER key (13), then checks if next node is an INPUT
//  // Then focuses next input box
//  handleKeyPress = (e, field) => {
//    if (e.keyCode === 13) {

//      console.log("keycode is 13")
//      e.preventDefault(); // Prevent form submission if button present

//      console.log("handle keypress this.refs ",this.refs)
//      console.log("handle keypress field.name ",field.name)

//      let next = this.refs[field.name].nextSibling;

//      console.log("next is ", next)
//      console.log("tagname is ", next.tagName)
//      if (next && next.tagName === 'INPUT') {
//        console.log("keytag is input")
//        this.refs[field.name].nextSibling.focus();
//      }
//    }
//  };

//  render() {
//    return (
//      <div>
//        <form onSubmit={this.handleSubmit}>
//        <div>
//            <label>
//              First Name:
//              <input
//                type="text"
//                name="firstname"
//                ref="firstname"
//                //onChange={this.props.handleFirstName}
//              />
//            </label>
//      </div>

//      <div>
//            <label>
//              Last Name:
//              <input
//                type="text"
//                name="lastname"
//                ref="lastname"
//                //onChange={this.props.handleLastName}
//              />
//            </label>
//    </div>
//    <div>
//            <label>
//              User Name:
//              <input
//                type="text"
//                name="username"
//                //onChange={this.handleUserNameChange}
//                ref="username"
//              />
//            </label>
//      </div>

//          <button type="submit">Register Player</button>
//        </form>
//      </div>
//    );
//  }
//}

export default RegisterPlayer;
