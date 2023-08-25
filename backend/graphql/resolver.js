//! RESOLVERS

const Watchlist = require('../models/Watchlist');

module.exports = {
  Query: {
    getWatchlist: async (_, args) => {
      const { userId } = args;
      try {
        const watchlist = await Watchlist.findOne({ userId });
        if (!watchlist) {
          throw new Error('Watchlist not found for this user.');
        }
        return watchlist;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  Mutation: {
    addToWatchlist: async (_, args) => {
      const { userId, coin } = args;
      try {
        let watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
          watchlist = new Watchlist({ userId, coins: [coin] });
        } else {
          watchlist.coins.push(coin);
        }

        await watchlist.save();
        return watchlist;
      } catch (error) {
        throw new Error("Failed to add to watchlist.");
      }
    },

    removeFromWatchlist: async (_, args) => {
      const { userId, coinId } = args;
      try {
        const watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
          throw new Error("Watchlist not found.");
        }

        // Remove the coin from the array
        watchlist.coins = watchlist.coins.filter(coin => coin.coinId !== coinId);
        await watchlist.save();
        return watchlist;
      } catch (error) {
        throw new Error("Failed to remove from watchlist.");
      }
    }
  }
};
