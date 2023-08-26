require('dotenv').config();

const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, './graphql/schema.graphql'), 'utf-8'));
const resolvers = require('./graphql/resolver');

const app = express();
const PORT = process.env.PORT || 3001;

// JSON parsing middleware
app.use(express.json());

// CORS configuration middleware
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

// Connect to database
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Ensure the ApolloServer is started before applying the middleware
(async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
})();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});