const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./router/routes');
const db = require('./database/db')

db.connect();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen (PORT, () => {
    console.log('listening on port', PORT);
})