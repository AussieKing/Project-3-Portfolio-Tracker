const mongoose = require('mongoose');

const WatchlistSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  coins: [
    {
      coinId: {
        type: String,
        required: true,
      },
      name: String,
      image: String,
      currentPrice: Number,
    },
  ],
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
