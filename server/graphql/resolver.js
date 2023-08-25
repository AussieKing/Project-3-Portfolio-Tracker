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
        console.log("Starting addToWatchlist resolver...");
        
        let watchlist = await Watchlist.findOne({ userId });
        
        console.log("Fetched watchlist:", watchlist);
   
        if (!watchlist) {
          console.log("No existing watchlist found. Creating a new one...");
          watchlist = new Watchlist({ userId, coins: [coin] });
        } else {
          console.log("Adding coin to existing watchlist...");
          watchlist.coins.push(coin);
        }
   
        const savedWatchlist = await watchlist.save();
        
        console.log("Saved watchlist:", savedWatchlist);
   
        return savedWatchlist;
      } catch (error) {
        console.error("Error in addToWatchlist resolver:", error);
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
