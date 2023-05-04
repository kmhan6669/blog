const contentsDatabase = require('./contents.mongo');
const DEFAULT_ID = 0;
//quilljs delta 포멧 ---수정 해야함
const contents = {
  id: DEFAULT_ID,
  date : 'Wed May 03 2023 22:11:08 GMT+0900',
  creator: 'hankm',
  title: "강아지풀",
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
};

//더미데이터 몽고db에 넣기

//시작시 db데이터 확인 함수
async function getContentsWhenStartServer () {
  const anyContent = await contentsDatabase.findOne({id: 1});
  if(!anyContent){
   await saveContents(contents);
   console.log('Load All Posts .......')
  }
}

//All contents 보내는 함수
async function getAllContents () {
  return await contentsDatabase.find({}, {_id: 0, __v: 0,});
}


//마지막 id 리턴하는 함수
async function getLatestContentIdNumber () {
  const latestContent = await contentsDatabase.findOne({}).sort('-id');
  if(!latestContent){
    return DEFAULT_ID;
  }
  return latestContent.id
}

// 콘텐츠를 데이터베이스에 저장 함수
async function saveContents (content) {
  await contentsDatabase.findOneAndUpdate({id: content.id}, content, {upsert: true});
}

// 저장할 데이터를 스키마에 맞게 바꿔서 저장 함수
async function postNewContents (content){
  const newContentId = (await getLatestContentIdNumber()) + 1;
  console.log(newContentId);
  const newContent = Object.assign(content, { id: newContentId });
  await saveContents(newContent);
}

module.exports = {
  saveContents,
  postNewContents,
  getAllContents,
  getContentsWhenStartServer,
  };