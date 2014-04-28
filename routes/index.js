var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Images' });
});

/* GET Some Image Page. */
router.get('/', function(req, res) {
  res.render('imageList', { title: 'ImageListPage' });
});

module.exports = router;
