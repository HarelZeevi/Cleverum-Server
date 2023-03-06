//import hasWhiteSpace from '../../test/testInput.js';
const express = require("express");

require('dotenv').config()
const cors = require('cors')

const app = express();

//var http = require('http').Server(app);

//var io = require('socket.io')(http);

app.use(express.json());

app.use(cors());

//const io = require("socket.io")(server);

// Import WebSocket file
//const websocket = require("./websocket.js");

// Pass io to WebSocket file
//websocket(io);

// Routes vars - Rest Api 
require('./api/routes/general.route')(app)

// reading PORT envirinment var to get an opened port
// If PORT is not set then the port var will get 3000.
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`[Listening on port ${port}]...`));
