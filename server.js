const express = require('express');
const app = express();
const PORT = 3000;
const router = require('./router/routes');
const db = require('./database/db');
const methodOverride = require('method-override');
const session = require('express-session');

db.connect();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({secret: 'a little bird told me something i cannot tell you at all costs'}))
app.use(router);

app.listen (PORT, () => {
    console.log('listening on port', PORT);
})