var mongoose = require('libs/mongoose')
var User = require('models/user').User

function dropDatabase() {
  var db = mongoose.connection.db
  return db.dropDatabase()
}

function createUsers() {
  var admin = new User({
    username: 'Admin',
    password: 'admin_password'
  })

  var manager = new User({
    username: 'Manager',
    password: 'managers_password'
  })

  var client = new User({
    username: 'Client',
    password: 'clients_password'
  })

  return Promise.all([
    admin.save(),
    manager.save(),
    client.save()
  ])
}

function close() {
  return mongoose.disconnect()
}

mongoose.connection.on('open', dropDatabase)
  .then(createUsers)
  .then(close)
  .then(() => {
    console.log('Seed has been successful!')
  })
  .catch(err => { throw err });
