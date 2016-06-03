/*
 * Serve JSON to our AngularJS client
 */
var express     = require('express');
var https       = require('https');
var q           = require('q');
var api         = express.Router();
var db          = require('../config/db').connection;
var parseString = require('xml2js').parseString;
var querystring = require('querystring');
var urlParse	= require('url').parse;

// API endpoint for /api/apparel
api.get('/api/apparel/:styleCode?', function(req, res) {
	// Insert Apparel API code here

	db.query('SELECT * FROM apparel WHERE style_code LIKE styleCode', function(err, rows, fields) {
		if (err) throw err;  

		console.log(rows);
	});
});

// API endpoint for /api/quote
api.post('/api/quote', function(req, res) {
	// Insert Quoting API code here
	db.query('SELECT * from printing_cost', function(err, rows, fields) {
		if (err) throw err;

		console.logs(rows);
	});

});

// Function for making an Inventory API call
var getApparelPrice = function getPrice(style_code, color_code, size_code) {
	var	apparelPriceDeferred = q.defer();

	var query = {
		"sr"					:'style_code',
		"cc"					:'11',
		"sc"					:'6',
		"username"				:'triggered1111',
		"password"				:'triggered2222',
		"pr"					:'y',
		"zp"					:'10002'
	}

	var url = 'https://www.alphashirt.com/cgi-bin/online/xml/inv-request.w?' + querystring.stringify(query);

	var options = {
		hostname: url, 
		port: 3000
	};

	// Format the Inventory API endpoint as explained in the documentation
	var req = https.get(options, function(res) {
		res.on('data', function (data) {
			// Parse response XML data here
			console.log("parsing");
			parseString(data, function(err, result){
				console.log(JSON.stringify(result));
				var jsonResult = JSON.stringify(result);
			});
		});
		res.on('end', function (){
			console.log("success");

		}).on('error', function(){
			console.log("response parsing error");
		});
	}).on('error', function(error) {
		// Handle EDI call errors here
		console.log("http request failed");
		throw error;
	}).on('uncaughtException', function (err) {
    	console.log(err);
	}).end();
	return apparelPriceDeferred.promise;
}

db.query('SELECT * from apparel', function(err, rows, fields) {
	if(err) throw err;
});


getApparelPrice('N3142', '11', '6');
module.exports = api;