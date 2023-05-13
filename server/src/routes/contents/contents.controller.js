const { postNewContents, getAllContents, getContent, postModifyContent, deleteContent } = require('../../models/contents.models');

//Get contents
async function httpGetAllContents (req, res) {
  res.status(200).json(await getAllContents());

}

//get one content
async function httpGetContent (req, res) {
  console.log(req.params.id)
  const id = Number(req.params.id)
  res.status(200).json(await getContent(id));
}
//Post content
async function httpPostContent (req, res) {
  const newContent = req.body;
  console.log('req.files.............. ', req.files);
  
  const newC = JSON.parse(newContent.contents)
  newC.ops.filter((op)=>op.insert?.image).map((op)=>{
    const splitUrl = op.insert.image.split('/')
    splitUrl[2] = 'localhost:8000/uploads';
    const joinUrl = splitUrl.join('/').slice(5) + '.jpg'
    op.insert.image = joinUrl;
  })
  
  newContent.ops = newC.ops;
  
  console.log('req.body............',req.body);
  console.log("filtered.........", newContent)
  await postNewContents(newContent)
  const IMG_URL = `http://localhost:8000/uploads/${req.files.filename}`;
  console.log(IMG_URL);
  res.json({ url: IMG_URL });
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