var { getView } = require('controllers/homeController')

module.exports = app =>
  app.get('/', (req, res) => getView(req, res))


