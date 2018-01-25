const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('connected to database '+config.database);
});

// On connection
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// CORS middleware allows to make api request from different domain
app.use(cors());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// Start server
app.listen(port, () => {
    console.log('Server started on port '+port);
});
