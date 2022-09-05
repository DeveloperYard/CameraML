const express = require('express');
// const fileUpload = require('express-fileupload');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const {textDetect} = require('./textDetection');

const app = express();

const upload = multer({storage: multer.memoryStorage()});
// 서버 측에 직접 저장하는게 아닌 메모리에서 처리해서 전달

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

const port = 8080;


app.listen(port, () => {
    console.log(`Server is on port ${port}.`);
})