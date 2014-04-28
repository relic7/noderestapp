/**
 * Created by JCut on 4/28/14.
 */

var express = require('express');
var router = express.Router();

/*
 * GET imagelist.
 */
router.get('/imagelist', function(req, res) {
    var db = req.db;
    db.collection('imagelist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addimage.
 */
router.post('/addimage', function(req, res) {
    var db = req.db;
    db.collection('imagelist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteimage.
 */
router.delete('/deleteimage/:id', function(req, res) {
    var db = req.db;
    var imageToDelete = req.params.id;
    db.collection('imagelist').removeById(imageToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;