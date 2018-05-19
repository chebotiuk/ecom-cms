var http = require('http')
var path = require('path')
var express = require('express')
var config = require('config')

var log = require('libs/logger')(module)
var hbs = require('express-handlebars')
var HttpError = require('error').HttpError
var sendHttpError = require('middleware/sendHttpError')
var loadUser = require('middleware/loadUser')
var routes = require('routes')
var sessionStore = require('libs/sessionStore')
var socket = require('socket')
var helpers = require('libs/helpers')

var app = express()

// view engine setup
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: path.join(__dirname, 'views/partials/'),
  helpers,
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.favicon()) // устанавливает favicon.ico

if (app.get('env') === 'development') { // выводит инфо о запросе
  app.use(express.logger('dev'))
} else {
  app.use(express.logger('default'))
}

app.use(express.bodyParser()) // разбирает тело запроса из POST, парсит в req.body

app.use(express.cookieParser()) // req.headers.cookie -> req.cookie

app.use(express.session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: sessionStore
}))

app.use(sendHttpError)

app.use(loadUser)

app.use(app.router)

routes(app)

app.use(express.static(path.join(__dirname, 'client/dist'))) // файлы public

app.use((req, res, next) => {
  next(new HttpError(404, '404 Page not found'))
})

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.sendHttpError(err)
  } else {
    if (app.get('env') === 'development') {
      var errorHandler = express.errorHandler()
      errorHandler(err, req, res, next)
    } else {
      log.error(err)
      err = new HttpError(500)
      res.sendHttpError(err)
    }
  }
})

const port = process.env.PORT
var server = http.createServer(app)
  .listen(port, () => {
    log.info('Express server listening on port ' + port)
  })

var io = socket(server)
app.set('io', io) // we can get it via req.app.get('io')
