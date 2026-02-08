const redis = require('../config/redis');
const { v4: uuidv4 } = require('uuid');
const Question = require('../models/Question');

exports.findMatch = async (playerId, level) => {
    const queueKey = `queue:lvl:${level}`;
    const opponentId = await redis.lPop(queueKey);

    if (opponentId && opponentId !== playerId) {
        const gameId = uuidv4();
        
        // Fetch 10 random questions for this level
        const questions = await Question.aggregate([
            { $match: { level: parseInt(level) } },
            { $sample: { size: 10 } }
        ]);

        const gameData = {
            gameId,
            p1: playerId,
            p2: opponentId,
            questions: JSON.stringify(questions),
            status: 'active'
        };

        await redis.hSet(`game:${gameId}`, gameData);
        await redis.expire(`game:${gameId}`, 3600);
        
        // Signal the waiting opponent
        await redis.set(`player_signal:${opponentId}`, JSON.stringify({ gameId, matched: true }));

        return { status: 'matched', gameId, opponentId, questions };
    } else {
        await redis.rPush(queueKey, playerId);
        return { status: 'waiting' };
    }
};