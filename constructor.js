var Datastore = require('nedb');

var masterDB = 'data/master.db';
var pagesDB = 'data/pages.db';
var templatesDB = 'data/templates.db';
var stylesheetsDB = 'data/stylesheets.db';

var dbMaster = new Datastore({ filename: masterDB, autoload: true });
var dbPage = new Datastore({ filename: pagesDB, autoload: true });
var dbTemplates = new Datastore({ filename: templatesDB, autoload: true });
var dbStylesheets = new Datastore({ filename: stylesheetsDB, autoload: true });


// TemplateName: 
// TemplateId: 
// PageID: 7A38053A-A9C5-40FD-AC43-91252FCC8059 // Template holder
// Pages: { items[0].id, items[1].id, items[2].id }
// styleSheetID: FA2A8824-58CD-4D49-9325-799BBCB02D46

// Procedures:
// Get template name & id
// Insert object to Master DB following the schema above


// GET TEMPLATE NAME & ID
// dbTemplates.find({}, {_id:0, id:1, templateId: 1, name: 1}, function (err, docs) {
// 	var tempCollection = [];
// 	tempCollection.push(docs);

// 	for(i in tempCollection){
// 	dbMaster.insert(tempCollection[i], function(err, docs) {
// 		console.log(docs);
// 	})
// 	}
// })

// SET PAGES & STYLESHEET PROPS
// dbTemplates.find({}, {_id:0, id:1, templateId: 1, name: 1}, function (err, docs) {
// 	var tempCollection = [];
// 	tempCollection.push(docs);

// 	// console.log(tempCollection.length);

// 	for(i in tempCollection[0]){
// 	// console.log(tempCollection[0][i])
// 	dbMaster.update({ id: tempCollection[0][i].id }, { $set: { pages: [], stylesheet: '' } }, {}, function(err, docs) {
// 		console.log(docs);
// 	})
// 	}
// })

// GET ALL PAGES IN DBPAGE, IF MATHCHES WITH TEMPLATEID, ADD IT TO TEMPLATE DATA
dbPage.find({}, {_id:0, id:1, templateId: 1, name: 1}, function (err, docs) {
	var tempCollection = [];
	tempCollection.push(docs);

	for(i in tempCollection[0]){
		dbMaster.update({ id: tempCollection[0][i].templateId }, { $push: { pages: tempCollection[0][i] } }, {}, function(err, doc) {
			console.log('success!');
		})
	}
})
// GET ALL STYLESHEETS IN DBSTYLESHEETS, IF NAME MATCHES, ADD IT TO TEMPLATE DATA
// dbStylesheets.find({}, {_id:0, id:1, name: 1}, function (err, docs) {
// 	console.log(docs);
// })