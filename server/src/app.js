const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// CORS설정
app.use(cors({
    origin: 'http://localhost:3000'
}));

// morgan 로그관리
app.use(morgan('combined'))


app.use(express.json());

//정적 파일 제공하기 빌드해서 퍼블릭에 넣어야함
//app.use(express.static(path.join(__dirname, '..', 'public')));


app.get('/', (req, res) => {
    res.send("hello server")
});

app.listen(8000, ()=>{
    console.log('listening on port 8000...')
});