const mongoose = require('mongoose');

const contentsSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  date : {
    type: Date,
    require: true,
  },
  creator: {
    type: String,
    require: true,
  },
  ops: new mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('Content', contentsSchema);