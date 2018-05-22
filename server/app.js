const http = require('http')
const path = require('path')
const express = require('express')
const config = require('config')
const log = require('libs/logger')(module)
const hbs = require('express-handlebars')
const HttpError = require('error').HttpError
const sendHttpError = require('middleware/sendHttpError')
const loadUser = require('middleware/loadUser')
const routes = require('routes')
const sessionStore = require('libs/sessionStore')
const socket = require('socket')
const helpers = require('libs/helpers')

const app = express()

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackConfig = require('../webpack.config.js')

  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
}

// view engine setup
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, '../client/views/layouts/'),
  partialsDir: path.join(__dirname, '../client/views/partials/'),
  helpers,
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../client/views'))

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

app.use(express.static(path.join(__dirname, '../client/dist'))) // файлы public

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
