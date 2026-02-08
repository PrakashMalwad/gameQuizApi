const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    gameId: { type: String, unique: true },
    player1Id: String,
    player2Id: String,
    winnerId: String,
    scores: { p1: Number, p2: Number },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);