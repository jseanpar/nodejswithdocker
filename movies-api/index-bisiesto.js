const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

moviesApi(app);

app.get('/json', function (req, res) {
    res.json({ hello: 'world' });
});

app.get('/:year', (req, res) => {
    const year = parseInt(req.params.year);
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        res.json('Is leap-year');
    } else {
        res.send('is NOT leap-year');
    }
});

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});