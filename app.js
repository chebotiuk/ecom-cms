var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/logger')(module);
var hb = require('express-handlebars');
var routes = require('routes');
var user = require('routes/user');

var app = express();
http.createServer(app)
	.listen(config.get('port'), function() {
	  log.info('Express server listening on port ' + config.get('port'));
	});

// view engine setup
app.engine('hb', hb({
	extname: 'hb',
	defaultLayout: 'index',
	layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hb');

app.use(express.favicon()); // устанавливает favicon.ico
if (app.get('env') == 'development') { // выводит инфо о запросе
	app.use(express.logger('dev'));
} else {
	app.use(express.logger('default'));
}
app.use(express.bodyParser()); // разбирает тело запроса из POST, парсит в req.body
app.use(express.cookieParser('your secret here')); // req.headers.cookie -> req.cookie

app.use(app.router); // как обрабатывать запросы

app.get('/', function(req, res, next) {
	res.render('home', {
		title: '<u>Hello, It is a first page on Node.js app</u>',
		condition: true,
		listArr: ['Test task from array 1', 'Test task from array 2', 'Test task from array 3']
	});
});

app.use(express.static(path.join(__dirname, 'public'))); // отдает статические файлы (из public), если ничего не было найдено выше 

app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV === 'development') {
		var errorHandler = express.errorHandler();
		errorHandler(err, req, res, next);
	} else {
		res.send(500);
	}
})

// app.get('/', routes.index);
// app.get('/users', user.list);

