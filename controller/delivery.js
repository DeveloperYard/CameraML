const Delivery = require('../models/record');

async function getRecord(req, res){
  const list = await Delivery.find().select('targetPlace createdAt -_id');
  if (!list){
    res.status(201).json({message: 'not yet delivery information'});
  }
  res.status(200).json({data : list});
}

async function testCreate(req, res){
  const rec = new Delivery({
    targetPlace: req.body.targetPlace
  });

  await rec.save();
  res.status(200).redirect('/delivery');
}

module.exports = {getRecord, testCreate};