const mongoose = require('../libs/mongoose')

var { Schema, Schema: { ObjectId } } = mongoose

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  wholesalePrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  marginRatio: {
    type: Number,
  },
  categoryId: {
    type: ObjectId,
  },
  article: {
    type: Number,
  }
})

schema.virtual('calculatedPrice')
  .get(function () {
    return this.wholesalePrice * this.marginRatio
  })

module.exports = mongoose.model('Product', schema)
