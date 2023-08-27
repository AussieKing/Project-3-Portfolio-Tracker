import { gql } from '@apollo/client';

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($userId: String!, $coin: CoinInput!) {
    addToWatchlist(userId: $userId, coin: $coin) {
      userId
      coins {
        coinId
        name
        image
        currentPrice
      }
    }
  }
`;