//! EXPRESS SERVER (backend/graphql)
//? The server.js file is the entry point for the application. It is responsible for connecting to the database, starting the ApolloServer, and starting the Express.js server.

require('dotenv').config();

const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const admin = require('./firebaseAdmin');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, './graphql/schema.graphql'), 'utf-8'));
const resolvers = require('./graphql/resolver');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  console.log('Extracted Token:', token);
  

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken; // Storing the decoded token in the request object
      console.log(decodedToken);  //! DEBUGGING PURPOSES
      next();
    })
    .catch((error) => {
      console.error('Error verifying token:', error);
      next();
    });
});

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      user: req.user // Passing the decoded user's token to Apollo's context
    };
  }
});

(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
})();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
