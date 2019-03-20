import React from 'react';
import Player from './Player';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

export const PLAYER_QUERY = gql`
  query {
    players {
      id
      firstName
      lastName
    }
  }
`;

class Player extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.player.firstName} ({this.props.player.lastName})
        </div>
      </div>
    );
  }
}

class PlayerList extends React.Component {
  render() {
    console.log('player list render function');
    return (
      <Query query={PLAYER_QUERY}>
        {({loading, error, data}) => {
          if (!data || loading) {
            console.log('Loading');
            return <div>Fetching</div>;
          } else if (error) return <div>Error</div>;
          else if (data) {
            console.log('DATA');
            console.log(data);
          }

          const playerToRender = data.players;
          return (
            <div>
              {playerToRender.map(player => (
                <Player key={player.id} player={player} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PlayerList;
