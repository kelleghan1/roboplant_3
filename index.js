require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const dev = process.env.NODE_ENV === 'development';

const io = require('socket.io')();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;
const logger = require('morgan');
const helpers = require('./helpers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const index = require('./routes/routes');

app.use(cors());

app.use(logger('dev'));

app.set('socketio', io);

app.use('/', index);

// app.use(express.static(__dirname + '/client'));

// app.all('*', (req, res, next) => {
//     res.sendFile('index.html', {
//         root: __dirname + '/client'
//     });
// });

app.use(express.static(dev ? helpers.root('client') : helpers.root('dist')));

app.all('*', (req, res, next) => {
    res.sendFile('index.html', {
        root: dev ? helpers.root('client') : helpers.root('dist')
    });
});

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});

io.listen(4200);
