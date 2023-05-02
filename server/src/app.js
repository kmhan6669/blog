const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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

const app = express();
// CORS설정
app.use(cors());

// morgan 로그관리
app.use(morgan('combined'))


app.use(express.json());

//정적 파일 제공하기 빌드해서 퍼블릭에 넣어야함
//app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/textarea', (req, res)=>{
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.send(contents);
});

app.prependOnceListener('/textarea', (req, res)=>{
  const newContents = req.body;
  contents.push({
    id: contents.length,
    ...newContents,
  });
  res.setHeader(201,'Content-Type', 'application/json; charset=utf-8')
  res.send(contents[contents.length-1]);
})



app.get('/', (req, res) => {
  res.send("hello server")
});

app.listen(8000, ()=>{
  console.log('listening on port 8000...')
});