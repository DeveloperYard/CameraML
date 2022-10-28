const express = require('express');
const authController = require('../controller/auth.js');
const path = require('path');
const router = express.Router();
const dirname = path.resolve();

router.get('/main', (req, res, next)=>{
  res.status(200).sendFile(dirname + '/templates/main.html');
})

router.get('/signup', (req, res, next)=>{
  res.status(200).sendFile(dirname + '/templates/signUpPage.html');
})
router.post('/signup', authController.signup);

router.get('/login', (req, res, next)=>{
  res.status(200).sendFile(dirname + '/templates/loginPage.html');
})
router.post('/login', authController.login);

// router.get('/user', authController.getUserInfo);
// 필요한 것, 유저 정보 수정 by using patch method!

module.exports = router;