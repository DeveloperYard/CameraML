const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const bcryptSaltRounds = 12; // Bcrypt salt 지정값

async function signup(req, res){
  console.log(req.body);
  const found = await User.findOne({username: req.body.username});
  if (found){
    return res.status(409).json({message: `${req.body.username} already exists`});
  }
  
  const hashedPw = bcrypt.hashSync(req.body.password, bcryptSaltRounds); // Encryption
  // 새로운 유저를 생성
  // 영식님 코드 참고해서 유저 모델 업데이트하고, 회원 정보 모델 정보 받아오는 코드 수정할 것! <- 구현하면 지우기!!!!
  // 지역 및 관심사 추가할 것
  const newUser = new User({
    username: req.body.username,
    password: hashedPw,
    name: req.body.name,
    nickname: req.body.nickname,
  });

  console.log(newUser);
  await newUser.save();

  res.status(201).redirect('/');
}

async function login(req, res){
  console.log(req.body);
  const {username, password} = req.body;
  // 유저의 아이디가 존재할 경우 추출해내는 구문
  const user = await User.findOne({username:username});
  if (!user){
    return res.status(401).json({message: 'Invalid id or password'});
  }
  // 들어온 패스워드값을 해싱해 DB에 있는 유저의 패스워드 정보와 대조
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({message: 'Invalid id or password'});
  }

  res.status(200).redirect('/auth/main');
}

async function getUserInfo(req, res){
  const users = await User.find(); 
  // 위에 기술한 것과 마찬가지로, req.token 또한 미들웨어에서 지정해줬기 때문에 이용할 수 있다!
  res.status(200).json({userlist: users});
}

module.exports = {signup, getUserInfo, login};
