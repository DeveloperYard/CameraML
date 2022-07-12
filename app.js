const express = require('express');
// const fileUpload = require('express-fileupload');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan')
const _ = require('lodash')
const path = require('path');

const {textDetect} = require('./textDetection');
const { fstat } = require('fs');

const app = express();

// -> express-fileupload 사용 시 모듈을 찾을 수 없다고 뜸!
// 파일 업로드 허용
// app.use(fileUpload({
//     createParentPath: true
// }));

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname);
//     }
// });

// let storage = multer.diskStorage({
//     destination: function(req, file ,cb){
//         cb(null, './uploads');
//     }
//     ,
//     filename: function(req, file, cb){
//         cb(null, file.originalname);
//     }  
// });

const upload = multer({storage: multer.memoryStorage()});

// 미들 웨어 추가
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/', (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname, '/templates/index.html'));
})

app.post('/', (req, res, next)=>{
    console.log(req.body.num);
    res.status(200).json({message: req.body.num});
})

app.post('/upload', upload.single('uploadFile'), async (req, res, next) => {
    try {
        if (!req.file) { 
            console.log(req.file);
            res.status(404).send({
                status: false,
                message: '파일 업로드 실패'
            });
        } else {
            let f = req.file;
            console.log(f);
            // console.log(req.files); -> 파일이 어떤 형식으로 되어있는지 확인하고 싶을 때 확인!
            let detectedNum = await textDetect(req.file.buffer);
            res.status(200).json({
                // status: true,
                detectionValue: detectedNum,
                message: '파일이 업로드 되었습니다.',
                // data: {
                //     name: f.name,
                //     minetype: f.minetype,
                //     size: f.size
                // }
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

app.use((err, req, res, next)=>{
    console.error(err);
})
// 여러 파일 업로드할 때 사용하려고 하나, 필요 없을 것 같음!
// app.post('/upload-multi', async(req, res) => {
//     try {
//         if (!req.files) {
//             res.send({
//                 status: false,
//                 message: "파일 업로드 실패"
//             })
//         } 
//         else {
//             let data = [];
//             // req.files는 잘 받아와짐!            
//             _.forEach(_.keysIn(req.files.photos), (key) => {
//                 let photo = req.files.photos[key];
//                 photo.mv('./uploads/' + photo.name)
//                 data.push({
//                     name: photo.name,
//                     minetype: photo.minetype,
//                     size: photo.size
//                 });
//             });

//             // return response
//             res.send({
//                 status: true,
//                 message: '파일들이 업로드 되었습니다.',
//                 data: data
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// })
// 포트 설정
const port = 8080;


app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})