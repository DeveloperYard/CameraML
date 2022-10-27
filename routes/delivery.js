const express = require('express');
const deliController = require('../controller/delivery.js');
const path = require('path');
const router = express.Router();
const dirname = path.resolve();
router.get('/', (req, res, next)=>{
  res.status(200).sendFile(dirname + '/templates/deliveryPage.html');
})
router.post('/', deliController.testCreate);
router.get('/record', deliController.getRecord);

module.exports = router;