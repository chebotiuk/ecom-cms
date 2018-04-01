var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectId = require('mongodb').ObjectId;

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('home', {
      title: '<u>Hello, It is a first page on Node.js app</u>',
      condition: true,
      listArr: ['Test task from array 1', 'Test task from array 2', 'Test task from array 3']
    });
  });

  app.get('/login', function(req, res, next) {
    res.render('login');
  });
  app.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username })
      .then(user => {
        if (user) {
          if (user.checkPassword(password)) {
            return user;
          } else {
            throw new HttpError(403, 'Password incorrect');
          }
        } else {
          var newUser = new User({
            username: username,
            password: password
          });

          return newUser.save();
        }
      })
      .then(user => {
        req.session.user = user._id;
        res.send({});
      })
      .catch(err => {
        next(err);
      })
  });

  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) return next(err);
      res.json(users);
    });
  });

  app.get('/user/:id', function(req, res, next) {
    try {
      var id = new ObjectId(req.params.id);
    } catch (err) {
      next(new HttpError(404, 'User not found'));
      return;
    }

    User.findById(id, function(err, user) {
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
