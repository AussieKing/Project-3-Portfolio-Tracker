//! SCHEMA

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Coin {
    coinId: String!
    name: String!
    image: String!
    currentPrice: Float!
  }

  type Watchlist {
    userId: String!
    coins: [Coin!]!
  }

  type Mutation {
    addToWatchlist(userId: String!, coin: CoinInput!): Watchlist
    removeFromWatchlist(userId: String!, coinId: String!): Watchlist
  }

  type Query {
    getWatchlist(userId: String!): Watchlist
  }

  input CoinInput {
    coinId: String!
    name: String!
    image: String!
    currentPrice: Float!
  }
`);
