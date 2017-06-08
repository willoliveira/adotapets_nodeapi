var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adotapets:admin@cluster0-shard-00-00-h6bbx.mongodb.net:27017,cluster0-shard-00-01-h6bbx.mongodb.net:27017,cluster0-shard-00-02-h6bbx.mongodb.net:27017/estudo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
// mongoose.connect('mongodb://localhost:27017/estudo')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);