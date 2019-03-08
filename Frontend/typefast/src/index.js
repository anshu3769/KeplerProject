import React from 'react';
import { ApolloClient } from 'apollo-client';
import  { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:5000/graphql"
 })


const client = new ApolloClient({
     link: httpLink,
     cache: new InMemoryCache()
});

//const store = configureStore(initialState, client);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
