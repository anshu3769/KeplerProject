import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_PLAYER = gql`
  mutation CreatePlayer(
    $firstName: String!
    $lastName: String!
    $userName: String!
  ) {
    createPlayer(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
    ) {
      player {
        firstName
        lastName
        userName
      }
    }
  }
`;

// class CreatePlayer extends React.Component {
//   render() {
//     let fName = this.props.firstName;
//     let lName = this.props.lastName;
//     let uName = this.props.userName;

//     console.log('CreatePlayer:: ', fName);
//     console.log('CreatePlayer:: ', lName);
//     console.log('CreatePlayer:: ', uName);
//     return (
//       <Mutation
//         mutation={CREATE_PLAYER}
//         errorPolicy="all"
//         onCompleted= {this.props.handleRegister}
//         // variables={{
//         //   firstName:"test5",
//         //   lastName:"test5",
//         //   userName:"test5"
//         // }}
//       >
//         {(createPlayer, {loading, data, error}) => (
//           <div>
//             <form
//               onSubmit={e => {
//                 e.preventDefault();
//                 createPlayer({
//                   variables: {
//                     firstName: fName,
//                     lastName: lName,
//                     userName: uName,
//                   },
//                 });
//               }}>
//               <button type="submit">Add Player</button>
//             </form>
//           </div>
//         )}
//       </Mutation>
//     );
//   }
// }

class CreatePlayer extends React.Component {
  // componentDidMount() {
  //   for (let x in this.refs) {
  //     this.refs[x].onkeypress = e => this.handleKeyPress(e, this.refs[x]);
  //   }
  //   this.refs.name.focus();
  // }

  // handleKeyPress = (e, field) => {
  //   // If enter key is pressed, focus next input field.
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     let next = this.refs[field.name].nextSibling;
  //     if (next && next.tagName === 'INPUT') {
  //       this.refs[field.name].nextSibling.focus();
  //     }
  //   }
  // };

  render() {
    let firstName;
    let lastName;
    let userName;

    console.log("render create player")
    return (
      <div>
        <Mutation
          mutation={CREATE_PLAYER}
          errorPolicy="all"
          onCompleted={this.props.handleRegister}>
          {(createPlayer, {loading, data, error}) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createPlayer({
                    variables: {
                      firstName: firstName.value,
                      lastName: lastName.value,
                      userName: userName.value,
                    },
                  });
                  firstName.value = '';
                  lastName.value = '';
                  userName.value = '';
                }}>
                <div>
                  <label>
                    First Name
                    <input
                      style={{marginLeft:10}}
                      type="text"
                      name="firstName"
                      onChange={this.props.handleFirstName}
                      ref={node => {
                        firstName = node;
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Last Name
                    <input
                      style={{marginLeft:10}}
                      type="text"
                      name="lastname"
                      onChange={this.props.handleLastName}
                      ref={node => {
                        lastName = node;
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    User Name
                    <input
                      style={{marginLeft:10}}
                      type="text"
                      name="username"
                      onChange={this.props.handleUserName}
                      ref={node => {
                        userName = node;
                      }}
                    />
                  </label>
                </div>
                <button style={{ marginTop:10, marginBottom:30}}type="submit">Register</button>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreatePlayer;
