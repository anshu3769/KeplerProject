import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

// const CREATE_PLAYER = gql`
//   mutation{
//     createPlayer(firstName:"first",lastName:"last",userName:"user"){
//     player{
//       firstName,
//       lastName,
//       userName
//     }
//   }
//   }
// `;
class Player extends React.Component {
  render(){

    return (
      <div>
        <div>
        {this.props.player.firstName} ({this.props.player.lastName})

      </div>
    </div>
    )
  }
}

export default Player
