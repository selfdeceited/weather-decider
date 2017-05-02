var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clothes Decider', meaning: 'I \'m sick and tired of numbers. I don\'t want to think, I want someone telling me what to do. '});
});

module.exports = router;
