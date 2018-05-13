var { HttpError } = require('error');
var { ObjectId } = require('mongodb');
var User = require('models/user');

class UserController {
  read (req, res, next) {
    User.find({}, (err, users) => {
      if (err) return next(err);
      res.json(users);
    });
  }

  readOne (req, res, next) {
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
  }
}

module.exports = new UserController()
