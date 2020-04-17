'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();
const port = 3000;
const httpsPort = 8000;

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');

const options = {
    key: sslkey,
    cert: sslcert
};

const passport = require('./utils/pass');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(express.static('uploads'));

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.get('/', (req,res) => {
    res.send(`Hello! secure? ${req.secure}`);
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
    res.end();
}).listen(port);
https.createServer(options, app).listen(httpsPort);