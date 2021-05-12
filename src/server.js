const path = require('path')
const express = require('express');
const app = express();
const routes = require('./routes')
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.use(routes)
app.listen(8080)
console.log('Runing server');