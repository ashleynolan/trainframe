/*
	sockets.js
*/

// dependencies for this module go here
// var UI = require('./ui');
var moment = require('moment');

var Sockets = {
	socket : null,

	init : function () {
		console.debug('Sockets module is being initialised');

		this.makeSocketConnection();

		this.Listeners.setup();
	},

	makeSocketConnection : function () {
		var connectionURL = window.location.hostname + ':' + window.location.port;

		this.socket = io.connect(connectionURL);
	},

	Listeners : {
		setup : function () {
			Sockets.socket.on('traintimes', this.onTimesReceived);
		},
		onTimesReceived : function (times) {
			// log('times received', times);

			var timetable = document.querySelector('.trainTimetable-contents'),
				tableHTML = '';
				lastUpdated = document.querySelector('.lastUpdated');

			for (time in times.trainServices) {
				tableHTML += '<tr>' +
				'<td>' + times.trainServices[time].operator + '</td>' +
				'<td>' + times.trainServices[time].platform + '</td>' +
				'<td>' + times.trainServices[time].etd + '</td>' +
				'<td>' + times.trainServices[time].std + '</td></tr>';
			}
			timetable.innerHTML = tableHTML;

			lastUpdated.innerHTML = ' ' + moment().format("h:mma");
		}
	}
};

module.exports = Sockets;