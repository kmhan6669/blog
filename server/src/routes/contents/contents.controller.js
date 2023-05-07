const { postNewContents, getAllContents } = require('../../models/contents.models');

//Get contents
async function httpGetAllContents (req, res) {
  res.status(200).json(await getAllContents());
}
//Post content
async function httpPostContent (req, res) {
    const newContents = req.body;
    if( !newContents.creator || !newContents.ops ){
      return res.status(400).json({ error: "missing required property"})
    }
    await postNewContents(newContents);
    res.status(201).json(newContents);
}
//Modify content
async function httpModifyContent (req, res) {
  const id = Number(req.params.id)

}
//Delete content
async function httpDeleteContent (req, res) {
  const id = Number(req.params.id)
}


module.exports = {
  httpGetAllContents,
  httpPostContent,
  httpModifyContent,
  httpDeleteContent
};