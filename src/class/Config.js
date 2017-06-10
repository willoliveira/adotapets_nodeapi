//TODO: implementar isso depois
// const Resource = require('config')

class Config {
	
	static get port () {
		return 3000;
	}
	
	static get database () {
		// return 'mongodb://localhost:27017/estudo';
		return 'mongodb://adotapets:admin@cluster0-shard-00-00-h6bbx.mongodb.net:27017,cluster0-shard-00-01-h6bbx.mongodb.net:27017,cluster0-shard-00-02-h6bbx.mongodb.net:27017/adotapets?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
	}

	static get allowOrigin () {
		return '*';
	}

	static get env () {
		return process.env.NODE_ENV || 'development';
	}
}

module.exports = Config;