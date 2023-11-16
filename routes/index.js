var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/assignments', function(req, res, next) {
  res.render('index', { title: 'Assignment Tracker' });
});

router.get('/schedule', function(req, res, next) {
  res.render('index', { title: 'Class Schedule' });
});

module.exports = router;
