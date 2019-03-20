import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

export const WORD_QUERY = gql`
  query {
    words {
      word
    }
  }
`;

class WordList extends React.Component {
  render() {
    return (
      <Query query={WORD_QUERY}>
        {({loading, error, data}) => {
          if (!data || loading) {
            console.log('Loading');
            return <div>Fetching</div>;
          } else if (error) return <div>Error</div>;
          else if (data) {
            console.log(data);
          }

          //This is to call the function on parent which
          //was passed as prop to this component
          this.props.onLoadComplete(data.words);
          return <div />;
        }}
      </Query>
    );
  }
}

export default WordList;
