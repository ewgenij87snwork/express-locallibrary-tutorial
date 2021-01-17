var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>Users</h1>');
});
router.get('/cool', function(req, res, next) {
  res.send('<h1>Cool</h1>');
});
module.exports = router;
