const Delivery = require('../models/record');

async function getRecord(req, res){
  const list = await Delivery.find().select('targetPlace createdAt deliveryStatus -_id');
  if (!list){
    return res.status(201).json({message: 'not yet delivery information'});
  }
  return res.status(200).json({data : list});
}

async function create(req, res){
  const rec = new Delivery({
    targetPlace: req.body.targetPlace
  });

  await rec.save();
  return res.status(201).redirect('/delivery');
}

async function getRecordNotDelivered(req, res){
  const notDeliveredPlace = await Delivery.findOne({deliveryStatus: false});
  if (notDeliveredPlace){
    await Delivery.updateOne({_id: notDeliveredPlace._id}, {deliveryStatus: true});
    return res.status(200).json({targetPlace: notDeliveredPlace.targetPlace});  
  }
  else {
    return res.status(200).json({});
  }
}

module.exports = {getRecord, create, getRecordNotDelivered};