var rail = require('national-rail-darwin');

var TrainApiController = {
	railApi: new rail('da13a8a6-b22f-4dd7-b6f5-4f1656223ae6'),
	socket: null,

	init: function (config) {

		// set emit time to every 30 seconds
		setInterval(this.emitScreenTimes, 60000);

	},

	setSocketServer: function (socketServer) {
		this.socket = socketServer;
	},

	emitScreenTimes: function (socket) {

		console.log('Calling train times');

		TrainApiController.railApi.getDepartureBoardWithDetails('BRI', { filter: 'STJ' }, function (err, result) {
			console.log(result);
			if (socket) {
				socket.emit('traintimes', result);
			} else {
				TrainApiController.socket.emit('traintimes', result);
			}
		});

	},

	getTimes: function (from, to) {
		return new Promise(function(resolve, reject) {
			console.log(from, to);
			TrainApiController.railApi.getDepartureBoardWithDetails(TrainApiController.getStationCode(from), { filter: TrainApiController.getStationCode(to) }, function (err, result) {
				resolve(TrainApiController.firstTime(result));
			});
		})
	},

	firstTime: function(result) {
		return result.trainServices[0].std;
	},

	getStationCode: function(station) {
		switch (station) {
			case 'bristol temple meads':
			case 'temple meads':
				return 'BRI';
			case 'severn tunnel junction':
			case 'severn tunnel':
				return 'STJ';
			case 'newport':
				return 'NWP';	
		}
	}
};

module.exports = TrainApiController;