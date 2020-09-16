var express = require('express');
var router = express.Router();

// var env = {
//   AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
//   AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
//   AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL 
// };

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;
