var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/master.db', autoload: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WSB Template Finder' } );
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
  var keyword = new RegExp(req.body.search, "i");
  // FIND TEMPLATE OR PAGE
  db.find({ $or: [{stylesheetId: { $regex: keyword } }, {name: { $regex: keyword } }, { id: { $regex: keyword } }, { pages: { $elemMatch: { id: { $regex: keyword } } } }]}, function(err, docs) {
    
    let pageMatch = ''; 
    let templateMatch = '';
    let styleMatch = '';
    let template =  '';

    if (docs.length > 0) {
      templateMatch = docs[0].name;
      styleMatch = docs[0].stylesheetId;
      template =  docs[0].pages;
      template.forEach( (page) => {
        let re = new RegExp(keyword)
        if (page.id.match(re) || page.name.match(re) ) {
          pageMatch = page;
          console.log(page.stylesheetId, "Stylesheet")
          console.log(page.id, "WE GOT A MATCH!")
        }
      })
    } else {
      res.render('error');
    }
    // return result = docs;
    console.log(docs.length);
    docs.length
    if (docs.length === 0) { res.redirect('/') } else { res.render('search', {'templates': docs, 'keyword': keyword, 'page': pageMatch.id, 'template': templateMatch, 'style': styleMatch }); } ; 
   
  })
});

module.exports = router;


