const express = require('express');
const http = require('http');
const router = require('./router/routes');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config')

const app = express();

// DB Setup
mongoose.connect(config.dburl);

// App Setup
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
router(app);

// Server Setup
const port = 8000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port)

