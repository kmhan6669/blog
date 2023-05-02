const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contentesRouter = require('./routes/contents/contents.router')


const MONGO_URL = 'mongodb+srv://kmhan:6XTnKTSHNgeCRsdp@blog.92gokew.mongodb.net/test';

// quilljs delta
const contents = [{
  id: 0,
  date : new Date(),
  creator: '',
  ops: [
    {
      attributes: {
        bold: true
      },
      insert: "이거 되는거 맞아?"
    },
    {
    attributes: {
        header: 1
      },
      insert: "\n"
    },
    {
      attributes: {
        italic: true
      },
      insert: "헐 이게 되네ㄷㄷ"
    },
    {
      attributes: {
        header: 2
      },
      insert: "\n"
    },
    {
      insert: "대박 와우\n"
    }
  ]
}];

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

//example url
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