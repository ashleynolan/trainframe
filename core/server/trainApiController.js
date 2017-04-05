var rail = require('national-rail-darwin');
var railApi = new rail('da13a8a6-b22f-4dd7-b6f5-4f1656223ae6');

railApi.getDepartureBoardWithDetails('BRI', {filter:'STJ'}, function(err, result) {
	console.log(result);
});

module.exports = {};