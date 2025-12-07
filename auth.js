// Simple API Key validation
const VALID_KEYS = [
    'demo-key', // Public demo key
    'user-123-key' // Example user key
];

const authenticate = (req, res, next) => {
    // Check header or query param
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    if (!apiKey || !VALID_KEYS.includes(apiKey)) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing API Key. Visit the home page to get one.',
            code: 401
        });
    }

    next();
};

module.exports = { authenticate };
