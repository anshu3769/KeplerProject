import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const LIST_USER = gql`
  query {
    players {
      userName
    }
  }
`;

class UserList extends React.Component {
  render() {
    return (
      <Query
          query={LIST_USER}
      >
        {({loading, error, data}) => {
          if (!data || loading) {
            console.log('Loading users');
            return <div>Fetching</div>;
          } else if (error) return <div>Error</div>;
          else if (data) {
            console.log('DATA');
            console.log(data);
          }

          //This is to call the function on parent which
          //was passed as prop to this component
          this.props.onLoadComplete(data.players);
          return <div />;
          //return null
        }}
      </Query>
    );
  }
}

export default UserList;
