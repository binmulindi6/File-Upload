const createError = require('http-errors');
const express = require("express");
const  router = express.Router();
const fs = require('fs');
const path = require('path');
const { title } = require('process');
let datas = []
  
/* GET home page. */
router.get('/home', (req, res, next) => {
    datas = JSON.parse(fs.readFileSync('database.json','utf-8'))
    res.render('index', {datas: datas, title: 'Home'})
  })


router.get('/', (req, res, next) => {
    res.redirect('/home')
})

module.exports = router;