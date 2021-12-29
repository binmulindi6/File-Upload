const createError = require('http-errors');
const express = require("express");
const router = express.Router();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const path = require('path');
let datas = []
let data

// default options
router.use(fileUpload());
router.use( express.static( path.join(__dirname, "public")));

//routes

router.get('/upload', (req, res, next) => {router
    res.render('upload', {title: 'upload'})
    //next()
});

datas = JSON.parse(fs.readFileSync('database.json','utf-8'))

router.post('/upload', (req, res) => {
    let sampleFile;

    let title;
    let newFileName;
    let uploadPath;
  
    if(req.body.fileName == "" || (!req.files || Object.keys(req.files).length === 0) ){

            return res.status(400).send('No files were uploaded. Please complete input fields');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;

        //The uploaded fileName
        const fileName = new Date().getTime()
        title = req.body.fileName

        //get file extention
        let ex = path.extname(sampleFile.name)
    
        //new file name
        newFileName = title + "_" + fileName + ex

        //file details storage
        data = {
          id : fileName,
          name : title,
          img : newFileName
        }

        datas.push(data)
        
        


    uploadPath = './public/uploads/' + newFileName.toString();
    



    //mv() method to place the file somewhere on the server
    sampleFile.mv(uploadPath, (err) => {
      if (err)
        return res.status(500).send(err);

        console.log('fileUploaded')
        console.log(datas)
        fs.writeFileSync('database.json',JSON.stringify(datas))
        res.redirect('/home')

    });
  });



  module.exports = router;