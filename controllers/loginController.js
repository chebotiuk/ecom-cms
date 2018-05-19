var User = require('models/user')
var { AuthError } = require('../error')

var HttpError = require('error').HttpError

class LoginController {
  getView (req, res) {
    res.render('login')
  }

  login (req, res, next) {
    var username = req.body.username
    var password = req.body.password

    User.authorize(username, password)
      .then(user => {
        req.session.user = user._id
        res.send({})
      })
      .catch(err => {
        if (err) {
          if (err instanceof AuthError) {
            next(new HttpError(403, err.message))
            return
          } else {
            next(err)
            return
          }
        }
      })
  }

  logout (req, res, next) {
    var sid = req.session.id
    var io = req.app.get('io')

    req.session.destroy((err) => {
      io.sockets._events.sessreload(sid) //generate system io event

      if (err) {
        next(err)
        return
      }

      if (req.xhr) {
        res.send(200)
        return
      }

      res.redirect('/')
    })
  }
}

module.exports = new LoginController()
