const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imagePath: { type: String, required: true },
    predictedDisease: { type: String, required: true },
    confidence: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', PredictionSchema);