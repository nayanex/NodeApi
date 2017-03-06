var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = require('../queries');

//router.get('/api/currentTimePosition', db.getAllCurrentTimePositions);
router.get('/api/timePosition', db.getAllTimePositions);
router.get('/api/timePosition/:id', db.getSingleTimePosition);
router.post('/api/timePosition', db.createTimePosition);
//router.delete('/api/timePosition/:id', db.removeTimePosition);

module.exports = router;
