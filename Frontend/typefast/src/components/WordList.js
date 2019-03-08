import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

 export const WORD_QUERY =  gql`
 query{
    words{
       word
    }
  }
`;

class WordList extends React.Component {
  render() {
    return (
     <Query query={WORD_QUERY}>
        {({ loading, error, data }) => {
          if (!data || loading)
          {
            console.log("Loading")
            return <div>Fetching</div>
          }
          else if (error) return <div>Error</div>
          else if(data)
          {
            console.log("DATA")
            console.log(data)
          }

          const wordsToRender = data.words
          console.log("wordsToRender ",data.words)
          return (
            <div>
            </div>
          )
          return null
        }}
      </Query>
    )
  }
}

export default WordList
