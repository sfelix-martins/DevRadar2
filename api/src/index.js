const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setUpWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setUpWebSocket(server);

mongoose.connect(
    'mongodb+srv://smartins:smartins@cluster0-h9u8a.mongodb.net/week10?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
