const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const router = require('./router/routes');
const db = require('./database/db');

const port = process.env.PORT || 3000;

db.connect();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({secret: 'a little bird told me something i cannot tell you at all costs'}))
app.use(router);

app.listen (port, () => {
    console.log('listening on port', port);
})