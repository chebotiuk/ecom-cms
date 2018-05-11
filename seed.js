var mongoose = require('libs/mongoose')
// var User = require('models/user').User
mongoose.set('debug', true)

var users = [
  {
    username: 'Admin',
    type: 'admin',
    password: 'admin_password'
  },
  {
    username: 'Regular',
    type: 'regularClient',
    password: 'managers_password'
  },
  {
    username: 'Client',
    type: 'client',
    password: 'clients_password'
  }
]

function requireModels () {
  require('models/user')

  return Promise.all(
    Object.keys(mongoose.models)
      .map(model => mongoose.models[model].ensureIndexes())
  )
}

function saveUser(userOptions) {
  var user = new mongoose.models.User(userOptions) // new User(userOptions)
  return user.save()
}

function dropDatabase() {
  var db = mongoose.connection.db
  return db.dropDatabase()
}

function createUsers() {
  return Promise.all(
    users.map(saveUser)
  )
}

function close() {
  return mongoose.disconnect()
}

mongoose.connection.on('open', dropDatabase)
  .then(requireModels)
  .then(createUsers)
  .then(close)
  .then(() => {
    console.log('Seed has been successful!')
  })
  .catch(err => {
    close()
    throw err
  })
