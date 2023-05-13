const multipart = require('connect-multiparty');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const multer = require('multer')

require("dotenv").config();

const contentsRouter = require('./routes/contents/contents.router');
const imageRouter = require('./routes/contents/image.router');
const { getContentsWhenStartServer } = require('./models/contents.models');


// quilljs delta


// mongoDB connection options
mongoose.connection.once('open', ()=>{
  console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});


const app = express();

// 미들웨어
app.use(cors());
app.use(morgan('combined'));
app.use(multipart());

//정적 파일 제공하기 빌드해서 퍼블릭에 넣어야함
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
//미들웨어 static serving하는 폴더를 지정해줌, 오픈해두면 갖다써라

//example url
app.use('/posts', contentsRouter);
app.use('/image', imageRouter);
app.get('/', (req, res) => {
  res.send('hello server');
});

async function startSever () {
  await mongoose.connect(process.env.MONGODB_URL);
  await getContentsWhenStartServer();
  app.listen(8000, ()=>{
    console.log('listening on port 8000...');
  });
}
startSever();