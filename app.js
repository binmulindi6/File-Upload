const createError = require('http-errors');
const express = require("express");
const fs = require('fs');
const path = require('path');
const { title } = require('process');
const { json } = require('body-parser');
let datas = []
let data

const indexRouter = require('./routes/index')
const uploadRouter = require('./routes/upload')

//Express app
const app = express()

// register view engine
app.set('view engine', 'ejs');

// default options
app.use( express.static( path.join(__dirname, "public")));
app.use('/',indexRouter);
app.use('/',uploadRouter);



//server port
const port = process.env.PORT || 3000
app.listen(port);

module.exports = app;