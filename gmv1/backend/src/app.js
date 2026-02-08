const express = require('express');
const router = express.Router();
const Matchmaking = require('../services/Matchmaking');
const Scoring = require('../services/Scoring');

router.post('/match', async (req, res) => {
    const { playerId, level } = req.body;
    const result = await Matchmaking.findMatch(playerId, level);
    res.json(result);
});

router.post('/submit', async (req, res) => {
    const { gameId, playerId, answers } = req.body;
    const result = await Scoring.calculateWinner(gameId, playerId, answers);
    res.json(result);
});

module.exports = router;