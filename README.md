# 🎮 Game Matchmaking & Quiz API

A high-performance Game API built with **Node.js**, **MongoDB**, and **Redis**. It features real-time player matchmaking based on skill levels and a competitive quiz engine.

---

## 🚀 Features
* **Player Matching:** FIFO queue system using Redis to match players of the same level.
* **Quiz Engine:** Randomly aggregates 10 questions from MongoDB per match using the `$sample` aggregation.
* **Competitive Scoring:** Winner is decided by accuracy first, then by speed (timestamp-based tie-breaker).
* **Persistent Records:** All game results are stored in MongoDB for history and analytics.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js (Express)
* **Database:** MongoDB (Mongoose)
* **Cache/Queue:** Redis (Node-Redis)
* **Utilities:** UUID (Game Sessioning), Dotenv, CORS

---

## 🚦 API Endpoints

### 1. Matchmaking
`POST /api/match`
| Key | Type | Description |
| :--- | :--- | :--- |
| `playerId` | String | Unique ID of the player |
| `level` | Number | Player's skill level (matches only same level) |

### 2. Submit Answers
`POST /api/submit`
| Key | Type | Description |
| :--- | :--- | :--- |
| `gameId` | String | The ID returned from the successful match |
| `playerId` | String | The ID of the player submitting |
| `answers` | Object | Map of `{ "questionId": "selectedAnswer" }` |

---

## 🧪 Testing with Postman

To test the complete matchmaking flow, follow these steps using the provided collection:

1. **Import the Collection:** Download the `GameAPI.postman_collection.json` file and import it into Postman.
2. **Environment Setup:** Set a Global or Environment variable `baseUrl` to `http://localhost:3000`.
3. **Step 1 - Player A:** Run the `Match Player 1` request. It will return `{"status": "waiting"}`.
4. **Step 2 - Player B:** Run the `Match Player 2` request. This will trigger a match. The `gameId` will be automatically saved to your Postman environment.
5. **Step 3 - Play:** Run the `Submit` requests for both players.
6. **Step 4 - Result:** The final submission will return the winner and the comparative scores.

---

## 📦 Local Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up `.env`:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/game_quiz
   REDIS_URL=redis://127.0.0.1:6379
