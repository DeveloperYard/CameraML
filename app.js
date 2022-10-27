const express = require('express');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

// const {textDetect} = require('./textDetection');
const authRouter = require('./routes/auth.js');
const deliveryRouter = require('./routes/delivery.js');

const app = express();
// 서버 측에 직접 저장하는게 아닌 메모리에서 처리해서 전달
// const upload = multer({storage: multer.memoryStorage()});
// 미들 웨어 추가
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/delivery', deliveryRouter);

app.get('/', (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname, '/templates/index.html'));
})

app.post('/', (req, res, next)=>{
    console.log(req.body.num);
    res.status(200).json({message: req.body.num});
})
app.get('/delivery', (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname, '/templates/deliveryInput.html'));
})
// app.post('/upload', upload.single('uploadFile'), async (req, res, next) => {
//     try {
//         if (!req.file) { 
//             console.log(req.file);
//             res.status(404).send({
//                 status: false,
//                 message: '파일 업로드 실패'
//             });
//         } else {
//             const f = req.file;
//             // console.log(f);
//             // console.log(req.files); -> 파일이 어떤 형식으로 되어있는지 확인하고 싶을 때 확인!
//             const detectedNum = await textDetect(req.file.buffer);
//             console.log(detectedNum);
//             res.status(200).json({
//                 detectionValue: detectedNum,
//                 message: '파일이 업로드 되었습니다.',
//             });
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500).send(err);
//     }
// })

app.use((err, req, res, next)=>{
    console.error(err);
})
const connectionParams = {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
};
mongoose.connect('mongodb://localhost:27017/ml', connectionParams);
const port = 3000;


app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})