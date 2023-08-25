import { gql } from '@apollo/client';

export const GET_WATCHLIST = gql`
  query GetWatchlist($userId: String!) {
    getWatchlist(userId: $userId) {
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
