var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var Twit = require('twit');
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
 
io.on('connection', function(socket) {
  var clientID = socket.id;

  console.log('new client joined')

  socket.on('new-roll', function(fillings) {
    console.log('client has rolled');
    this.broadcast.emit('new-roll', {data: fillings});




  })

});







var T = new Twit({
  consumer_key:         'HJaqnzjjXolAcJEzEc52g',
  consumer_secret:      'wcVog7O6W8Waf0Yxie3TLATRVzwIxNUGtGONGjGc',
  access_token:         '1951886503-Vh0FEjyR9FYzjkTKWwb2xV0T0xez4NigAhbkAjC',
  access_token_secret:  'b9HjeGLVJqryNLzBU7prv3GzoSDHHTtz4LVQc8ycFY'
})

app.get('/tweet', function(req, res){
  T.post('statuses/update', { status: req.query.tweet }, function(err, reply) {
    if (err) {
      console.log(err);
      res.end('bad stuff happened');
    } else {
      console.log(reply);
      res.end('Tweeted: ' + req.query.tweet);
    }
  })
});