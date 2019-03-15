import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_SCORE = gql`
  mutation UpdateScores($userName: String!, $userScore: Int!) {
    updateScores(userName: $userName, userScore: $userScore) {
      score {
        userName
        value
      }
    }
  }
`;

class UpdateScore extends React.Component {
  render() {
    console.log('passed username', this.props.userName);
    console.log('passed scores', this.props.score);

    let uName = this.props.userName;
    let score = this.props.score;

    console.log('username', uName);
    console.log('scores', score);
    return (
      <Mutation mutation={UPDATE_SCORE} errorPolicy="all">
        {(updateScores, {loading, data, error}) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateScores({
                  variables: {
                    userName: uName,
                    userScore: score,
                  },
                });
              }}>
              <button type="submit">Update your score</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default UpdateScore;
