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
// function generateTemplateNameIDStylesheet() {
// 	dbTemplates.find({}, {_id:0, id:1, templateId: 1, name: 1, stylesheetId: 1}, function (err, docs) {
// 		var tempCollection = [];
// 		tempCollection.push(docs);

// 		for(i in tempCollection){
// 			dbMaster.insert(tempCollection[i], function(err, docs) {
// 				console.log(docs);
// 			})
// 		}
// 	})
// }

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
	var tempCollection = docs; //Array
	// tempCollection.push(docs);
	// console.log(Array.isArray(tempCollection))
	// console.log(docs);
	// for(i in tempCollection[0]){
	// 	dbMaster.update({ id: tempCollection[0][i].templateId }, { $push: { pages: tempCollection[0][i] } }, {}, function(err, doc) {
	// 		console.log('success!');
	// 	})
	// }
	// for(i in tempCollection)
	// console.log("orphan template is: ", tempCollection[213]);

	for (var i = tempCollection.length - 1; i >= 0; i--) {
		// console.log("counter=>", i)
		// console.log(tempCollection[i].templateId, tempCollection[i]);
		var templateIdOfPage = tempCollection[i].templateId;

		function matchTemplate(template, page, name) {
			dbMaster.find({ id: template }, function(err, doc) {
			// var output;
			// if (doc[0]['name']) {
			// 	output = doc[0]['name'];
			// } else {
			// 	output = "null"
			// }
			// console.log(tempCollection[i].templateId);
			// console.log(Array.isArray(doc));
			// console.log(doc[0].id);
			// console.log(doc[0].name);
			if (doc.length === 0) {
				console.log("orphan template");
			} else {
				// console.log(doc[0].id);
				// console.log(doc[0].name);
				console.log('current id: ', template);
				dbMaster.update({ id: template }, { $push: { pages: {"id": page, "name": name } } }, {}, function(err, doc) {
					console.log('updated document: ', page );
				})
			}
			})
		}

		// console.log("current: ", templateIdOfPage);
		matchTemplate(templateIdOfPage, tempCollection[i].id, tempCollection[i].name);
	}
})



// GET ALL STYLESHEETS IN DBSTYLESHEETS, IF NAME MATCHES, ADD IT TO TEMPLATE DATA
// dbStylesheets.find({}, {_id:0, id:1, name: 1}, function (err, docs) {
// 	console.log(docs);
// })