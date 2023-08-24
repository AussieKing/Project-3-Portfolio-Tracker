const Watchlist = require('../models/Watchlist');

module.exports = {
  addToWatchlist: async ({ userId, coin }) => {
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
  }
};
