//! APOLLO CLIENT CONFIGURATION

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '../firebase';

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from Firebase if it exists
  const token = await auth.currentUser?.getIdToken();

  // Return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;