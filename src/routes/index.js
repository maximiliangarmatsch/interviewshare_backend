var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {  
  res.send("Welcome to Interview Share Backend")
});

module.exports = router;
