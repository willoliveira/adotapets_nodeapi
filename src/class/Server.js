
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
		'origin': '*',
		'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
		'preflightContinue': false
	}));

	app.use(bodyParser.json());

	app.use(function(req, res) {
		res.status(404).send({url: req.originalUrl + ' not found'})
	});

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
	
	//   Module.setup(router)
	//TODO: perguntar
	//   app.use('/api', router)

	//todo: pensando em jogar isso no index...
	require('../module')(router);
	
	app.listen(Config.port);
	
	console.log(`Server listening on ${Config.port}`);
	//   $logger.verbose(`Server listening on ${Config.port}`)
}