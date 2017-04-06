var alexaResponse = require('alexa-response');
var trainApi = require('core/server/trainApiController');

var controller = {
	RespondTo: function (req) {
		return new Promise(function (resolve, reject) {
			var request = req.body.request,
				requestIntent = request.intent.name;
			requestSlots = request.intent.slots;

			trainApi.getTimes(controller.getSlotValue(requestSlots, 'stationfromslot'), controller.getSlotValue(requestSlots, 'stationtoslot'))
				.then(function (response) {
					console.log(alexaResponse.say('The next train is at ' + response).build());
					resolve(alexaResponse.say('The next train is at ' + response).build());
				}, function(error) {
					console.log('broken');
					resolve(alexaResponse.say('I don\'t understand what station you\'re looking for').build());
				})
		});
	},

	getSlotValue: function (slots, slotID) {
		return slots[slotID].value;
	}
};

module.exports = controller;