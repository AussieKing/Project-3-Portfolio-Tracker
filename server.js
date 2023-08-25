const express = require('express');
const connectDB = require('./backend/utils/db');

const schema = require('./backend/graphql/schema');
const resolvers = require('./backend/graphql/resolver');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

connectDB();

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
