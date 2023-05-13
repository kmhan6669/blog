const { postNewContents, getAllContents, getContent, postModifyContent, deleteContent, getLatestContentIdNumber } = require('../../models/contents.models');

//Get contents
async function httpGetAllContents (req, res) {
  res.status(200).json(await getAllContents());

}

//get one content
async function httpGetContent (req, res) {
  console.log(req.params.id)
  const id = Number(req.params.id)
  const content = await getContent(id);
  if (content === null) {
    return res.status(404).send();
  }
  res.status(200).json(content);
}
//Post content
async function httpPostContent (req, res) {
  const newContent = req.body;
  console.log('req.files.............. ', req.files);
  
  const newC = JSON.parse(newContent.contents)
  newC.ops.filter((op)=>op.insert?.image).map((op)=>{
    const splitUrl = op.insert.image.split('/');
    splitUrl[2] = 'localhost:8000/uploads';
    const joinUrl = splitUrl.join('/').slice(5) + '.jpg';
    op.insert.image = joinUrl;
  })
  newContent.ops = newC.ops;
  
  await postNewContents(newContent);
  const id = await getLatestContentIdNumber()
  res.send(id);
}

//Delete content
async function httpDeleteContent (req, res) {
  const id = Number(req.params.id)
  await deleteContent(id);
  res.status(201).send("deleted")
}


module.exports = {
  httpGetAllContents,
  httpPostContent,
  httpDeleteContent,
  httpGetContent,
};