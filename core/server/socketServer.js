var io = require('socket.io'); //socket.io - used for our websocket connection


var SocketServer = {
	init : function (app, server, config, fatController) {

		//Start a Socket.IO listen
		var socketServer = io.listen(server);

		fatController.setSocketServer(socketServer);

		//  ==================
		//  === ON CONNECT ===
		//  ==================

		//If a client connects, give them the current data that the server has tracked
		//so here that would be how many tweets of each type we have stored
		socketServer.sockets.on('connection', function(socket) {
			console.log('trainframe.js: New connection logged');

			//needs to emit a state from our twitter controller
			fatController.getTimes(socket);
		});


		//  ============================
		//  === SERVER ERROR LOGGING ===
		//  ============================
		socketServer.sockets.on('close', function(socket) {
			console.log('trainframe.js: socketServer has closed');
		});

		return socketServer;
	}
};

module.exports = SocketServer.init;