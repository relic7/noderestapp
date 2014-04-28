/**
 * Created by JCut on 4/28/14.
 */

var express = require('express');
var router = express.Router();

/* GET Images listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});



module.exports = router;
