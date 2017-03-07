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

  // FIND JSON TEMPLATE
  // db.findOne({ id: req.body.search }, function(err, docs) {
  //   console.log(docs);
  //   // return result = docs;
  //   // console.log(result);
  //   // if (err) { return err }; 
  // 	res.render('search', { title: 'Search results', result: docs.name });
  // })

  // FIND TEMPLATE OR PAGE
  db.find({ $or: [{ id: req.body.search }, { pages: { $elemMatch: { id: req.body.search } } }]}, function(err, docs) {
    console.log(docs);
    // return result = docs;
    // console.log(result);
    if (docs.length === 0) { res.redirect('/') } else { res.render('search', { title: 'Search results', name: docs[0].name, style: docs[0].stylesheetId, numberPages: docs[0].pages.length, pagesArray: docs[0].pages }); } ; 
   
  })
});

module.exports = router;


