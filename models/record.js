const mongoose = require('mongoose');

const deliSchema = new mongoose.Schema({
  targetPlace: String,
  deliveryStatus: {type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('DeliveryList', deliSchema);
