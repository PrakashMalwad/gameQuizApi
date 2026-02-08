const mongoose = require('mongoose');
const Question = require('./src/models/Question'); // Double check this path
require('dotenv').config();

const questions = [
    { level: 1, content: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
    { level: 1, content: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
    { level: 1, content: "What is 15 + 27?", options: ["32", "42", "45", "38"], correctAnswer: "42" },
    { level: 1, content: "Which animal is the 'King of the Jungle'?", options: ["Tiger", "Elephant", "Lion", "Giraffe"], correctAnswer: "Lion" },
    { level: 1, content: "What is the chemical symbol for water?", options: ["CO2", "H2O", "O2", "NaCl"], correctAnswer: "H2O" },
    { level: 1, content: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
    { level: 1, content: "Which is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "Pacific" },
    { level: 1, content: "Who wrote 'Romeo and Juliet'?", options: ["Dickens", "Shakespeare", "Twain", "Austen"], correctAnswer: "William Shakespeare" },
    { level: 1, content: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: "8" },
    { level: 1, content: "What gas do humans breathe to survive?", options: ["Nitrogen", "CO2", "Oxygen", "Helium"], correctAnswer: "Oxygen" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🍃 Connected to MongoDB...');
        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log('✅ 10 questions seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

seedDB();