var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Interview Share Backend' });
res.send("Welcome to Interview Share Backend")
});

module.exports = router;
