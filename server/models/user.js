var crypto = require('crypto')
var mongoose = require('libs/mongoose')
var { AuthError } = require('../error')

var { Schema } = mongoose

var schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
}

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password
    this.salt = Math.random() + ''
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function() {
    return this._plainPassword
  })

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword
}

schema.statics.authorize = function(username, password) {
  var User = this

  return User.findOne({ username: username })
    .then(user => {
      if (user) {
        if (user.checkPassword(password)) {
          return user
        } else {
          throw new AuthError('Password incorrect')
        }
      } else {
        var newUser = new User({
          username: username,
          password: password
        })

        return newUser.save()
      }
    })
}

module.exports = mongoose.model('User', schema) // Экспортируем объект для управления бд
