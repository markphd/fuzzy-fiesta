// Initialize Data

// Dependenices
var jsonfile = require('jsonfile');
var walk = require('walk');
var fs = require('fs');
var Datastore = require('nedb');

// File source
var sitemap = 'data/web.data.Site.site.json';
var pathPages = 'data/Pages';
var pathStylesheets = 'data/Stylesheet';
var pathTemplates = 'data/Templates';
// Database File source
var pagesDB = 'data/pages.db';
var templatesDB = 'data/templates.db';
var stylesheetsDB = 'data/stylesheets.db';

// Collections
var pages = [];
var templates = [];
var stylesheets = [];

function initializeFiles(src, collection, db) {
	walker = walk.walk(src); 
	  walker.on("file", function (root, fileStats, next) {
	    fs.readFile(fileStats.name, function () {
	      collection.push(root + '/' + fileStats.name);
	      // console.log(root + '/' + fileStats.name);
	      next();
	    });
	  });
	  walker.on("errors", function (root, nodeStatsArray, next) {
	    next();
	  });
	  // walker.on("end", function() {
	  //   console.log("all done");
	  //   initializeDB(db, collection);
	  // });
	  walker.on("end", function() {
	  	initializeDB(db, collection);
	  	console.dir(collection);
	  })
}

function initializeDB(filename, collection) {
	var db = new Datastore({ filename: filename, autoload: true });

	db.remove({}, { multi: true }, function (err, numRemoved) {
		console.log(numRemoved)
	});

	for(i in collection){
		jsonfile.readFile(collection[i], function(err, obj) {
			if (err) {return "Something went wrong."}
		// console.dir(Object.keys(obj.folder.items[0])); //0-2 Array: Display Items for Layouts, Templates, WC Menu Styles
		// var templates = obj.folder.items[0];
		// var templatePages = templates.items;
		// console.log(obj.folder.items[0]); // All templates
		// siteDoc.push(obj);
		// console.dir(typeof templatePages);
		// for(i in templatePages){
		// 	db.insert(templatePages[i], function(err, newDoc) {
		// 		console.log(newDoc);
		// 	})
		// }
			db.insert(obj, function(err, doc) {
				if (err) {return err};
				// console.log(doc);
			})
		})
	}

	console.log('DB init');

}

initializeFiles(pathPages, pages, pagesDB);
initializeFiles(pathTemplates, templates, templatesDB);
initializeFiles(pathStylesheets, stylesheets, stylesheetsDB);