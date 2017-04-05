var rail = require('national-rail-darwin');

var TrainApiController = {
	railApi: new rail('da13a8a6-b22f-4dd7-b6f5-4f1656223ae6'),
	socket: null,

	init : function (socketServer, config) {

		this.socket = socketServer;

		// set emit time to every 30 seconds
		setInterval(this.getTimes, 60000);

	},

	getTimes: function (socket) {

		console.log('Calling train times');

		TrainApiController.railApi.getDepartureBoardWithDetails('BRI', {filter:'STJ'}, function(err, result) {
			console.log(result);
			if (socket) {
				socket.emit('traintimes', result);
			} else {
				TrainApiController.socket.emit('traintimes', result);
			}
		});

	}
};

module.exports = TrainApiController;