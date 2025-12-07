const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const { authenticate } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for public assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Protect /api routes with API Key
app.use('/api', authenticate, routes);

// Base route (Public Website)
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the MotoGP API',
        endpoints: {
            riders: '/api/riders',
            teams: '/api/teams',
            schedule: '/api/schedule',
            standings: '/api/standings'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
