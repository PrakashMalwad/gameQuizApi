const redis = require('../config/redis');
const Question = require('../models/Question');
const GameRecord = require('../models/Game');

exports.submitAndCalculate = async (gameId, playerId, answers) => {
    const gameKey = `game:${gameId}`;
    const gameData = await redis.hGetAll(gameKey);
    if (!gameData.gameId) throw new Error("Game not found");

    const questions = JSON.parse(gameData.questions);
    let score = 0;

    questions.forEach(q => {
        if (answers[q._id] === q.correctAnswer) score++;
    });

    const sub = { score, time: Date.now() };
    await redis.hSet(gameKey, `sub:${playerId}`, JSON.stringify(sub));

    const s1 = await redis.hGet(gameKey, `sub:${gameData.p1}`);
    const s2 = await redis.hGet(gameKey, `sub:${gameData.p2}`);

    if (s1 && s2) {
        const p1Sub = JSON.parse(s1);
        const p2Sub = JSON.parse(s2);

        let winnerId = p1Sub.score > p2Sub.score ? gameData.p1 : 
                       p2Sub.score > p1Sub.score ? gameData.p2 : 
                       (p1Sub.time < p2Sub.time ? gameData.p1 : gameData.p2);

        await GameRecord.create({
            gameId,
            player1Id: gameData.p1,
            player2Id: gameData.p2,
            winnerId,
            scores: { p1: p1Sub.score, p2: p2Sub.score }
        });

        return { status: 'finished', winnerId, scores: { [gameData.p1]: p1Sub.score, [gameData.p2]: p2Sub.score } };
    }

    return { status: 'pending', message: 'Waiting for opponent' };
};