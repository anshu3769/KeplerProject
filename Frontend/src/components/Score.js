import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';


//Update individual player's score
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

//Update the top five scores
const UPDATE_TOP_SCORES = gql`
  mutation UpdateTopScores($userName: String!, $userScore: Int!) {
    updateTopScores(userName: $userName, userScore: $userScore) {
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
      <Mutation mutation={UPDATE_SCORE}
      errorPolicy="all"
      onCompleted = {this.props.handleScoreUpdate}
      >
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
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default UpdateScore;
