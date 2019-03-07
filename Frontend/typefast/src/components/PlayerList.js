import React from 'react'
import Player from './Player'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const PLAYER_QUERY =  gql`
  query {
    players{
        id
        name
        }
  }
`;

class PlayerList extends React.Component {
  render() {

    console.log("player list render function")
    const playerToRender = [
      {
        id: '1',
        name: 'Player 1',
      },
      {
        id: '2',
        name: 'Player 2',
      },
    ]

   // return (
     // <div>{playersToRender.map(player => <Player key={player.id} player={player} />)}</div>
    //)

    return (
      <Query query={PLAYER_QUERY}>
        {({ loading, error, data }) => {
          if(data) console.log("data is there")
          if (!data || loading) return <div>Fetching</div>
          console.log("after fetching")
          if (error) return <div>Error</div>


          const playersToRender = data.players
          return (
            <div>
              {playersToRender.map(player => <Player key={player.id} player={player} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default PlayerList
