
/**
 * Declare our Module dependencies at the top
 */

var express = require('express'),
	bodyParser = require('body-parser'),

	pkg = require('package.json');


var server = {

	init : function (app, config) {
		app.set('showStackError', true);

		// should be placed before express.static - compressed with gzip (if we have any views)
		// app.use(compress({
		// 	filter: function (req, res) {
		// 		return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		// 	},
		// 	level: 9
		// }));

		app.use('/css', express.static('public/css'));
		app.use('/js', express.static('public/js'));
		app.use('/fonts', express.static('public/fonts'));

		app.set('views', 'core/client/views');
		app.set('view engine', 'jade');
		app.set("view options", { layout: false });

		app.set('port', process.env.PORT || config.port || 8081);

		// bodyParser should be above methodOverride
		app.use(bodyParser.urlencoded({
			extended: true
		}));
		app.use(bodyParser.json());

		// expose package.json to views
		app.use(function (req, res, next) {
			res.locals.pkg = pkg;
			next();
		});

	}

};

module.exports = server.init;