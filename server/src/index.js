const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { getDatabaseStatus } = require('./config/dbConnectionStatus');

require('dotenv').config();


const corsOptions = {
    origin: '*',
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    req.startTime = Date.now();
    next();
});


// Routes
app.use('/', routes);
app.get("/", (req, res) => res.send("Server is running"));

app.get('/health', (req, res) => {
    const start = req.startTime;
    const isDatabaseConnected = getDatabaseStatus();
    const end = Date.now();
    const duration = end - start;

    if (isDatabaseConnected) {
        res.status(200).json({ status: 'ok', message: 'Health is good', duration: `${duration}ms` });
    } else {
        res.status(500).json({ status: 'error', message: 'Health check failed', duration: `${duration}ms` });
    }
});


module.exports = app;
