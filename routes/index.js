var express = require('express');
var router = express.Router();

var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/master.db', autoload: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search', function(req, res, next) {
  // var search = req.body.search;
  // var result = '';
  // console.log(req.body.search);
  // db.find({id: search}, {name: 1, _id: 0}, function(err, docs) {
  // 	console.log(docs);
  // 	result = docs;
  // })
  db.findOne({ id: req.body.search }, function(err, docs) {
    console.log(docs);
    // return result = docs;
    // console.log(result);
    // if (err) { return err }; 
  	res.render('search', { title: 'Search results', result: docs.name });
  })
  // db.find({}, function(err, doc) {
  // 	console.log(doc);
  // })
  // console.log(result);
  // res.render('search', { title: 'Search results', result: result });
});

module.exports = router;


