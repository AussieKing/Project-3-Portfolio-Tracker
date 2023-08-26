//! RESOLVERS

const Watchlist = require('../models/Watchlist');
console.log("Resolvers file is loaded.");

module.exports = {
  Query: {
    test: () => {
      console.log("Test resolver invoked!");
      return "Test successful!";
    },
    // getWatchlist: async (_, args) => {
    //   const { userId } = args;
    //   try {
    //     const watchlist = await Watchlist.findOne({ userId });
    //     if (!watchlist) {
    //       console.error(`No watchlist found for userId: ${userId}`);
    //       throw new Error('Watchlist not found for this user.');
    //     }
    //     return watchlist;
    //   } catch (error) {
    //     console.error("Error in getWatchlist:", error);
    //     throw new Error(error.message);
    //   }
    // }
    getWatchlist: async (_, args) => {
      console.log("getWatchlist invoked with args:", args);
      
      return {
        userId: "fede.dordoni@gmail.com",
        coins: [{
          coinId: "testCoinId",
          name: "TestCoin",
          image: "https://sampleurl.com",
          currentPrice: 100.00
        }]
      };
    },    
  },
  Mutation: {
    addToWatchlist: async (_, args) => {
      console.log("addToWatchlist invoked with args:", args);

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
    }
  }
};

