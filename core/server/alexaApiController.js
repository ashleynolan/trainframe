var alexaResponse = require('alexa-response');


var controller = {
	RespondTo: function() { 
		console.log('Gay');
		return alexaResponse.say('Nick is gay').build(); 
	}
};

module.exports = controller;