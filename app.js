
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index); 
app.get('/favorite', routes.favorite);
app.get('/good', routes.good);
app.get('/users', user.list);




var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require("socket.io").listen(server);

// io.set('transports', [
//  'xhr-polling',
//  'jsonp-polling'
// ]);


var images = [
 "/images/image1.jpg",
 "/images/image2.jpg",
 "/images/image3.jpg",
 "/images/image4.jpg",
 "/images/image5.jpg"
];  

var index = 0;

io.sockets.on('connection', function (socket) {
});

function broadcast() {
    
  io.sockets.emit('broadcast:image', {
      imageUrl: images[index]
  });
  
  index ++;
  index = index % images.length;
  
  setTimeout(function () {
      broadcast();
  }, 500);
}

broadcast();
