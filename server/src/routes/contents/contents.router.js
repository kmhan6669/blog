const contentesRouter = require('express').Router();

const {httpGetAllContents, httpPostContent}= require('./contents.controller')

contentesRouter.get('/', httpGetAllContents);
  
contentesRouter.post('/',httpPostContent)
  


module.exports = contentesRouter;