const mongoose = require('mongoose');

const deliSchema = new mongoose.Schema({
  targetPlace: String,
}, {timestamps: true});

module.exports = mongoose.model('DeliveryList', deliSchema);