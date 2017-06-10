var MongoDB = require('./src/class/MongoDB')();
var Config = require('./src/class/Config');
var Server = require('./src/class/Server');
var connectionString = Config.database;
var db;

db = MongoDB.connect(connectionString);

db.on('error', (error) => {
	throw error
});

db.on('disconnected', () => {
	console.log('Database connection closed')
});

db.on('connected', () => {
	console.log('Database connected')
	Server.run()
});