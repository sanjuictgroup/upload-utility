const cors        = require('cors');
const express     = require('express');
const app         = express();
var bodyParser    = require('body-parser')
const uploadRoute = require('./process/upload');
app.use(cors());
app.options('*', cors());
app.use(bodyParser({limit: '50mb'}));
app.use(express.json())
app.use('/api/v1', uploadRoute)
app.listen(3000, () => {
    console.log(`Example app listening at port - 3000`)
}).timeout = 1800000;
module.exports = app;