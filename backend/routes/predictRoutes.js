const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const Prediction = require('../models/Prediction');
const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Please upload an image' });

        const imagePath = req.file.path;
        
        // Prepare form data to send to Flask API
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));

        // Call Flask ML API
        const flaskResponse = await axios.post(process.env.FLASK_API_URL, formData, {
            headers: formData.getHeaders()
        });

        const { disease, confidence } = flaskResponse.data;

        // Save to Database
        const newPrediction = new Prediction({
            userId: req.user.userId,
            imagePath: imagePath,
            predictedDisease: disease,
            confidence: confidence
        });

        await newPrediction.save();

        res.json({ disease, confidence, imagePath });
    } catch (error) {
        console.error("Prediction Error: ", error.message);
        res.status(500).json({ message: 'Error processing prediction' });
    }
});

router.get('/history', authMiddleware, async (req, res) => {
    try {
        const history = await Prediction.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;