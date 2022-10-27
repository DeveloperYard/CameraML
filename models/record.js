const mongoose = require('mongoose');

const deliSchema = new mongoose.Schema({
  targetPlace: String,
  time : { type: Number, default: (new Date()).getTime() }
});

module.exports = mongoose.model('DeliveryList', deliSchema);