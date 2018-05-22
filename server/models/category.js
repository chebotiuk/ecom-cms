var mongoose = require('libs/mongoose')

var { Schema } = mongoose

var schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
})

exports.Category = mongoose.model('Category', schema)
