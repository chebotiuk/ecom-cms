var mongoose = require('libs/mongoose');

var { Schema, Schema: { ObjectId } } = mongoose;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  categoryId: {
    type: ObjectId,
  }
});

module.exports = mongoose.model('Product', schema);
