const contentsDatabase = require('./contents.mongo');
const DEFAULT_ID = 0;
//quilljs delta 포멧 ---수정 해야함
const contents = {
  id: DEFAULT_ID,
  date : new Date(),
  creator: 'hankm',
  title: "새 글을 입력해주세요",
  ops:[{"insert":"새글"},{"insert":{"image":"http://localhost:8000/uploads/0fef359c-5529-4863-9eb2-ac4e6bc91afb"}},{"insert":"\n"}]
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
  const contents = await contentsDatabase.find({}, {_id: 0, __v: 0,});

  return contents;

}
// content 하나 보내는 함수
async function getContent(id) {
  return await contentsDatabase.find({id : id},{_id: 0, __v: 0,});
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
    const newContent = Object.assign(
      content, 
      {
        id: newContentId,
        date: new Date()
      }
    );

    await saveContents(newContent);
  }

async function postModifyContent (contentId) {

}
// 삭제하기
async function deleteContent (contentId){
  await contentsDatabase.deleteOne({id:contentId})
}

module.exports = {
  postNewContents,
  getAllContents,
  getContentsWhenStartServer,
  postModifyContent,
  deleteContent,
  getContent,
  };