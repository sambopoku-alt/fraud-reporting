// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to the database
mongoose.connect('mongodb://localhost/fraudReporting', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema for reports
const reportSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Report = mongoose.model('Report', reportSchema);

const app = express();
app.use(bodyParser.json());

// Endpoint to create a new report
app.post('/reports', async (req, res) => {
    const report = new Report(req.body);
    await report.save();
    res.status(201).send(report);
});

// Endpoint to get all reports with optional filtering
app.get('/reports', async (req, res) => {
    const { title, date } = req.query;
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (date) filter.date = new Date(date);

    const reports = await Report.find(filter);
    res.send(reports);
});

// Endpoint to search reports
app.get('/search', async (req, res) => {
    const { query } = req.query;
    const reports = await Report.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    });
    res.send(reports);
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
