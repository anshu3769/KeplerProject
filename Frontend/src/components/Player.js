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


class CreatePlayer extends React.Component {

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
