const express = require('express');
const router = express.Router();
const Matchmaking = require('../services/matchmaking');
const Scoring = require('../services/scoring');

router.post('/match', async (req, res) => {
    const result = await Matchmaking.findMatch(req.body.playerId, req.body.level);
    res.json(result);
});

router.post('/submit', async (req, res) => {
    const result = await Scoring.submitAndCalculate(req.body.gameId, req.body.playerId, req.body.answers);
    res.json(result);
});

module.exports = router;