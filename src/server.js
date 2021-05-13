const path = require('path')
const express = require('express');
const app = express();
const routes = require('./routes')
var session = require('express-session');
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));
app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

app.use(routes)
app.listen(8080)
console.log('Runing server');