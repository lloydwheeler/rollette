var express = require('express')
  , routes = require('./routes')
  , http = require('http');
 
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
 
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});
 
app.get('/', routes.index);
 
io.on('connection', function(socket){
  var clientID = socket.id;
  console.log(clientID);
});