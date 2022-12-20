//import hasWhiteSpace from '../../test/testInput.js';
const express = require("express");
require('dotenv').config()
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cors());




//ROUTE VARS
require('./api/routes/general.route')(app)


// reading PORT envirinment var to get an opened port
// If PORT is not set then the port var will get 3000.
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`[Listening on port ${port}]...`));
