var alexaResponse = require('alexa-response');
var trainApi = require('core/server/trainApiController');

var controller = {
	RespondTo: function(req) { 

		var request = req.body.request,
			requestIntent = request.intent.name;
			requestSlots = request.intent.slots;

		trainApi.getTimes(controller.getSlotValue(requestSlots, 'stationfromslot'), controller.getSlotValue(requestSlots, 'stationtoslot'))
		.then(function(response) {
			console.log(response);
			return alexaResponse.say('The next train is at ' + response).build(); 
		})	
	},

	getSlotValue: function (slots, slotID) {
		return slots[slotID].value;
	}
};

module.exports = controller;