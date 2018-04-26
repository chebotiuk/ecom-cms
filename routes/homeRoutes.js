var HomeController = require('../controllers/homeController');

module.exports = app => {
  app.get('/', (req, res) => HomeController.getView(req, res));
}


