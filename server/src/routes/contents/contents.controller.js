const { postNewContents, getAllContents } = require('../../models/contents.models');

//Get contents
async function httpGetAllContents (req, res) {
  res.status(200).json(await getAllContents());
}
//Post content
async function httpPostContent (req, res) {
  console.log(req)
  res.send();
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