const express = require('express');
const connectDB = require('./utils/db');
const expressGraphQL = require('express-graphql');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

connectDB();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
