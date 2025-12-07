const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read data
const readData = (filename) => {
    const dataPath = path.join(__dirname, 'data', filename);
    try {
        if (!fs.existsSync(dataPath)) {
            return [];
        }
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${filename}:`, err);
        return [];
    }
};

// GET /riders
router.get('/riders', (req, res) => {
    const riders = readData('riders.json');
    res.json(riders);
});

// GET /teams
router.get('/teams', (req, res) => {
    const teams = readData('teams.json');
    res.json(teams);
});

// GET /schedule
router.get('/schedule', (req, res) => {
    const schedule = readData('schedule.json');
    res.json(schedule);
});

// GET /standings
router.get('/standings', (req, res) => {
    const standings = readData('standings.json');
    res.json(standings);
});

// GET /tracks
router.get('/tracks', (req, res) => {
    const tracks = readData('tracks.json');
    res.json(tracks);
});

module.exports = router;
