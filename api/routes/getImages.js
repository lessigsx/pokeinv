var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  let fileNames = [];
  const directoryPath = path.join(__dirname, '..', 'public', 'images', 'gen1');

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
      fileNames.push(file);
    });

    res.send(fileNames);
  });
});

module.exports = router;
