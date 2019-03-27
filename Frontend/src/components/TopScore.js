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
      <Query query={TOP_SCORES_QUERY} fetchPolicy="cache-and-network">
        {({loading, error, data}) => {
          if (!data || loading) {
            console.log('Loading Scores');
            return <div>Fetching</div>;
          } else if (error) return <div>Error</div>;
          else if (data) {
            console.log('Scores loaded');
            console.log(data);
          }

          const entries = data.topScores;

          return (
            <div>
              <table>
                <tbody>
                  {entries.map(function(item, key) {
                    return (
                      <tr key={key}>
                        <td style={{paddingRight: '50px', paddingLeft: '30px'}}>
                          {item.userName}
                        </td>
                        <td style={{paddingLeft: '50px'}}>{item.value}</td>
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
