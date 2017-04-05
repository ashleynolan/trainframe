
var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	config,
	sharedConfig;

var sharedConfig = {
	root: rootPath,
	trainKeys: {
		apiToken: process.env.NRT_TOKEN
	}
};

module.exports = {
	local: {
		mode: 'local',
		clientURL: 'http://localhost:5000',
		port: 3002,
		app: {
			name: 'TrainFrame - local'
		},
		global: sharedConfig
	},

	dev: {
		mode: 'development',
		clientURL: 'http://localhost:3002',
		port: 3002,
		app: {
			name: 'TrainFrame - Dev'
		},
		global: sharedConfig
	},

	prod: {
		mode: 'production',
		clientURL: 'https://trainframe.herokuapp.com',
		port: 3002,
		app: {
			name: 'TrainFrame - Prod'
		},
		global: sharedConfig

	},

	hosts: [
		{
			domain: 'trainframe.local',
			target: ['localhost:3001']
		}
	]
};