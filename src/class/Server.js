
var express = require('express');
// var morgan = require('morgan');
var CORS = require('cors');
// var Helmet = require('helmet');
// var busboy = require('express-busboy');
var Config = require('./Config');
// var handler = require('./RequestMiddleware');
// var Module = require('../module');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


module.exports.run = () => {
	// TODO: Set in config
	app.use(CORS({
		'origin': ['*', "http://localhost:8100"],
		'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
	}));
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());


	//TODO : pesquisar o que é
	//   app.use(Helmet())

	//todo: pesquisar
	//   busboy.extend(app, {
	//     upload: true,
	//     path: Config.upload.path + '/.tmp',
	//     mimeTypeLimit: Config.upload.validMimeType
	//   })

	//TODO: Pesquisar
	//   if (Config.env !== 'production') app.use(morgan('dev'))

	app.use('/api/v1', router);

	//todo: pensando em jogar isso no index...
	require('../module')(router);

	// app.use(function(req, res) {
	// 	res.status(404).send({url: req.originalUrl + ' not found'})
	// });

	app.listen(Config.port);

	console.log(`Server listening on ${Config.port}`);
}