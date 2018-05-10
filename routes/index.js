var chatRoutes = require('./chatRoutes');
var loginRoutes = require('./loginRoutes');
var homeRoutes = require('./homeRoutes');

var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectId = require('mongodb').ObjectId;

module.exports = app => {
  homeRoutes(app)
  loginRoutes(app)
  chatRoutes(app)

  app.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) return next(err);
      res.json(users);
    });
  });

  app.get('/user/:id', (req, res, next) => {
    try {
      var id = new ObjectId(req.params.id);
    } catch (err) {
      next(new HttpError(404, 'User not found'));
      return;
    }

    User.findById(id, (err, user) => {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        next(new HttpError(404, 'User not found'));
        return
      }

      res.json(user);
    });
  });
};
