//! WATCHLIST ROUTES

const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');

//! READ user's watchlist
router.get('/watchlist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const watchlist = await Watchlist.findOne({ userId: userId });
        if (!watchlist) {
            return res.status(404).json({ message: 'Watchlist not found for this user.' });
        }
        res.json(watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//! POST: Add coin to user's watchlist
router.post('/watchlist/add', async (req, res) => {
    const { userId, coin } = req.body;

    try {
        let watchlist = await Watchlist.findOne({ userId: userId });

        if (!watchlist) {
            watchlist = new Watchlist({
                userId: userId,
                coins: [],
            });
        }

        watchlist.coins.push(coin);
        await watchlist.save();
        res.status(201).json(watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
