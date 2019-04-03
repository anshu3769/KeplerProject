# Introduction
Typing game. 
 * On logging in, the words will appear on the screen, user will type the word and hit enter.
 * Words are random sequence of characters i.e. not real words.
 * Test your muscle memory without knowing the word in advance.
 * A 1 minute timer for each round.
 * After timer expiry, scores are calculated
 * Option to submit scores, start new game and logout.

# Design Details
Consists of two parts -
* Frontend
* Backend

## Frontend
Go to the frontend.

* Used create-react-app to create the base framework. 
* Directory structure for the frontend
* All the components are in the components directory
* CSS styling files in styles folder.
* Components and query/mutation.
    * Player component, talk about onCompleted. wha problem it solved.
    * UserList - its purpose and show throughn demo. onLoadComplete
    * TopScore - fetchPolicy for refetching
    * App - render function and different views

## Backend

Database - sqlite
Graphql for querying and updations
* Directory Structure
* Files inside the data folder
* Graphql interface - queries and mutations
* [CORS] (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)


