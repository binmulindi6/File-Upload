const createError = require('http-errors');
const express = require("express");
const fs = require('fs');
const fileUpload = require('express-fileupload');
const path = require('path');

//Express app
const app = express()

// register view engine
app.set('view engine', 'ejs');

// default options
app.use(fileUpload());

app.get('/', (req, res) => {
  res.redirect('/upload')
})

app.get('/upload', (req, res) => {
    res.render('upload')
    //next()
});


app.post('/upload', (req, res) => {
    let sampleFile;
    let fileName;
    let newFileName;
    let uploadPath;
  
    if(req.body.fileName == "" || (!req.files || Object.keys(req.files).length === 0) ){

            return res.status(400).send('No files were uploaded. Please complete input fields');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;

        //The uploaded fileName
        fileName = req.body.fileName

        //get file extention
        let ex = path.extname(sampleFile.name)
    
        //new file name
        newFileName = fileName + ex

    uploadPath = __dirname + '/uploads/' + newFileName.toString();
    



    //mv() method to place the file somewhere on the server
    sampleFile.mv(uploadPath, (err) => {
      if (err)
        return res.status(500).send(err);

        console.log('fileUploaded')
        res.redirect('/upload')

    });
  });

//server port
const port = process.env.PORT || 3000
app.listen(port);