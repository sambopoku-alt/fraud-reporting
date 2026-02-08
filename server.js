'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fraudReporting', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Fraud Report Schema
const FraudReportSchema = new mongoose.Schema({
    reportId: { type: String, required: true },
    description: { type: String, required: true },
    dateReported: { type: Date, default: Date.now }
});

const FraudReport = mongoose.model('FraudReport', FraudReportSchema);

// API Endpoints
app.post('/api/reports', async (req, res) => {
    const { reportId, description } = req.body;
    const report = new FraudReport({ reportId, description });
    try {
        await report.save();
        res.status(201).send(report);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/reports', async (req, res) => {
    try {
        const reports = await FraudReport.find();
        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
