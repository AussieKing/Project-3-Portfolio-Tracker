//! SERVER

const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolver');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = process.env.PORT || 3001;

// JSON parsing middleware
app.use(express.json());

// CORS configuration middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to database
connectDB();

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
