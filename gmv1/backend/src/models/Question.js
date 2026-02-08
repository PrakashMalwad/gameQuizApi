const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    level: Number,
    content: String,
    options: [String],
    correctAnswer: String
});

module.exports = mongoose.model('Question', QuestionSchema);