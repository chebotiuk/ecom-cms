var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;
var ObjectId = require('mongodb').ObjectId;
var checkAuth = require('middleware/checkAuth');

module.exports = app => {
  app.get('/', (req, res, next) => {
    res.render('home', {
      title: '<u>Hello, It is a first page on Node.js app</u>',
      condition: true,
      listArr: ['Test task from array 1', 'Test task from array 2', 'Test task from array 3']
    });
  });

  app.get('/login', (req, res, next) => {
    res.render('login');
  });
  app.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password)
      .then(user => {
        req.session.user = user._id;
        res.send({});
      })
      .catch(err => {
        if (err) {
          if (err instanceof AuthError) {
            next(new HttpError(403, err.message));
            return
          } else {
            next(err)
            return
          }
        }
      })
  });
  app.post('/logout', (req, res, next) => {
    var sid = req.session.id;
    var io = req.app.get('io');

    req.session.destroy((err) => {
      io.sockets._events.sessreload(sid); //generate system io event

      if (err) {
        next(err);
        return
      }

      res.redirect('/');
    });
  });

  app.get('/chat', checkAuth, (req, res, next) => {
    res.render('chat');
  });

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
