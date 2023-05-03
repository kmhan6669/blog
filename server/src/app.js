const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contentesRouter = require('./routes/contents/contents.router')


const MONGO_URL = 'mongodb+srv://kmhan:6XTnKTSHNgeCRsdp@blog.92gokew.mongodb.net/test';


// mongoDB connection options
mongoose.connection.once('open', ()=>{
  console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});


const app = express();

// CORS설정
app.use(cors());

// morgan 로그관리
app.use(morgan('combined'))

app.use(express.json());

//정적 파일 제공하기 빌드해서 퍼블릭에 넣어야함
//app.use(express.static(path.join(__dirname, '..', 'public')));

//example url 나중에 quill들어오면 그때 수정
app.use('/textarea', contentesRouter);

app.get('/', (req, res) => {
  res.send("hello server")
});

async function startSever () {
  await mongoose.connect(MONGO_URL);

  app.listen(8000, ()=>{
    console.log('listening on port 8000...')
  });
}
startSever();