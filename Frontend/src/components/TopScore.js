import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

export const TOP_SCORES_QUERY = gql`
  query {
    topScores {
      userName
      value
    }
  }
`;

class TopScores extends React.Component {
  render() {
    return (
      <Query query={TOP_SCORES_QUERY}>
        {({loading, error, data}) => {
          if (!data || loading) {
            console.log('Loading Scores');
            return <div>Fetching</div>;
          } else if (error) return <div>Error</div>;
          else if (data) {
            console.log('Scores loaded');
            console.log(data);
          }

          //console.log(data.topScores)
          //const entries = Object.entries(
          //data.topScores).map(data =>
          //Object.entries(data))

          const entries = data.topScores;

          //console.log(entries)
          //This is to call the function on parent which
          //was passed as prop to this component
          //this.props.onLoadComplete(data);
          return (
            <div>
              <table>
                <tbody>
                  {entries.map(function(item, key) {
                    return (
                      <tr key={key}>
                        <td>{item.userName}</td>
                        <td>{item.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ); //<div/>;
        }}
      </Query>
    );
  }
}

export default TopScores;
